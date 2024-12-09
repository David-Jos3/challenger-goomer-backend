export class InvalidFormatHoursException extends Error {
  constructor() {
    super('Invalid time format. Please use 24-hour format.')
  }
}
