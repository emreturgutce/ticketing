export class DatabaseConnectionError extends Error {
  reason = 'Failed to connect to database'

  constructor() {
    super()

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
  }
}
