import BaseError from "./baseError"
import HttpStatusCode from "./httpStatusCodes"

class ServiceError extends BaseError {
  constructor(
    name: string,
    httpCode = HttpStatusCode.INTERNAL_SERVER,
    isOperational = true,
    description = "Service error"
  ) {
    super(name, httpCode, isOperational, description)
  }
}

export default ServiceError
