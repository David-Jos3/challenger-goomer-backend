export class InvalidTimeOrderException extends Error {
  constructor() {
    super('Invalid opening hours. Start time must be earlier than end time.')
  }
}
