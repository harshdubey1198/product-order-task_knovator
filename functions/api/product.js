import { connectDB } from "../db/cloudflare.db.js";
import { ProductService } from "../../server/services/productService.js";
import { createResult } from "../../server/utils/utills.js";
import uploadToCloudinary from "../../server/utils/uploadToCloudinary.js";

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" }
  });
}

export async function onRequest(context) {
  try {
    await connectDB(context.env.MONGO_URI);

    const url = new URL(context.request.url);
    const method = context.request.method;

    // LIST
    if (method === "GET" && url.pathname.endsWith("/products")) {
      const search = url.searchParams.get("search") || "";
      const page = url.searchParams.get("page") || 1;
      const limit = url.searchParams.get("limit") || 10;

      const result = await ProductService.getProducts({
        search,
        page,
        limit
      });

      return json(200, createResult("Products fetched successfully", result));
    }

    // GET BY ID
    if (method === "GET") {
      const id = url.pathname.split("/").pop();
      const product = await ProductService.getProductById(id);

      if (!product)
        return json(404, createResult(null, null, "Product not found"));

      return json(
        200,
        createResult("Product fetched successfully", product)
      );
    }

    // CREATE
    if (method === "POST" && url.pathname.endsWith("/create")) {
      const form = await context.request.formData();

      let imageUrl = "";
      const file = form.get("image");

      if (file) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const uploaded = await uploadToCloudinary(buffer);
        imageUrl = uploaded.secure_url;
      }

      const product = await ProductService.createProduct({
        name: form.get("name"),
        description: form.get("description"),
        price: form.get("price"),
        image: imageUrl
      });

      return json(201, {
        message: "Product created successfully",
        data: product
      });
    }

    // UPDATE
    if (method === "PUT" && url.pathname.includes("/update/")) {
      const id = url.pathname.split("/").pop();
      const form = await context.request.formData();
      const data = Object.fromEntries(form.entries());

      const file = form.get("image");
      if (file) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const uploaded = await uploadToCloudinary(buffer);
        data.image = uploaded.secure_url;
      }

      const product = await ProductService.updateProduct(id, data);

      return json(200, {
        message: "Product updated successfully",
        data: product
      });
    }

    // DELETE
    if (method === "DELETE") {
      const id = url.pathname.split("/").pop();
      const deleted = await ProductService.deleteProduct(id);

      if (!deleted)
        return json(404, createResult(null, null, "Product not found"));

      return json(
        200,
        createResult("Product deleted successfully", deleted)
      );
    }

    return new Response("Not Found", { status: 404 });
  } catch (err) {
    return json(500, { error: err.message });
  }
}
