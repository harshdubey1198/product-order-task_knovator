function createResult(message, data, error) {
  return {
    message: message || null,
    data: data || null,
    error: error 
  };
}

module.exports = {
  createResult
};
