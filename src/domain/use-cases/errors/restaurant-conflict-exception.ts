export class RestaurantConflictException extends Error {
  constructor() {
    super('Restaurant with the same address and name already exists')
  }
}
