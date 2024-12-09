export class InvalidTimeIntervalException extends Error {
  constructor() {
    super('Opening hours must be at least 15 minutes apart.')
  }
}
