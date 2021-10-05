import HttpStatusCode from "./httpStatusCodes"

class BaseError extends Error {
  public readonly name: string
  public readonly httpCode: typeof HttpStatusCode[keyof typeof HttpStatusCode]
  public readonly isOperational: boolean

  constructor(
    name: string,
    httpCode: typeof HttpStatusCode[keyof typeof HttpStatusCode],
    isOperational: boolean,
    description?: string
  ) {
    super(description)
    Object.setPrototypeOf(this, new.target.prototype)

    this.name = name
    this.httpCode = httpCode
    this.isOperational = isOperational

    Error.captureStackTrace(this)
  }
}

export default BaseError
