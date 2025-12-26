import React, { useEffect, useRef } from "react";

export default function GoogleAd({ slot, style }) {
  const adRef = useRef(null);

  useEffect(() => {
    if (adRef.current) {
      try {
        // Only push if not already initialized
        if (!adRef.current.dataset.adStatus) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          adRef.current.dataset.adStatus = "done";
        }
      } catch (e) {
        console.error("AdSense error:", e);
      }
    }
  }, []);

  return (
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={{ display: "block", ...style }}
      data-ad-client="ca-pub-3940256099942544" // test client
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}
