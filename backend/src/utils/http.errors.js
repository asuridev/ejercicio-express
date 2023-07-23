

class ControlledError extends Error {
  message;
  statusCode;
  constructor(message, statusCode) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

class HttpErrors {
  static badRequest(message){
    return new ControlledError(message,400);
  }
  static unauthorized(message){
    return new ControlledError(message,401);
  }
  static notFound(message){
    return new ControlledError(message,404);
  }
  static conflict(message){
    return new ControlledError(message,409);
  }
}

module.exports = {
  ControlledError,
  HttpErrors
}