export class InvalidPriceException extends Error {
  constructor() {
    super('Price must be a positive value')
  }
}
