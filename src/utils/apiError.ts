import BaseError from "./baseError"
import HttpStatusCode from "./httpStatusCodes"

class APIError extends BaseError {
  constructor(
    name: string,
    httpCode = HttpStatusCode.INTERNAL_SERVER,
    isOperational = true,
    description = "API error"
  ) {
    super(name, httpCode, isOperational, description)
  }
}

export default APIError
