class wrongAuthError extends Error {
    constructor(message) {
      super(message);
      this.statusCode = 401;
    }
  }
  
  module.exports = wrongAuthError; 