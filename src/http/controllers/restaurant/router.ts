import { RegisterRestaurantController } from './register-restaurant.controller'
import { app } from '../../../app'

export class RegisterRestaurantRouter {
  static async create() {
    app.post('/restaurants', RegisterRestaurantController.create)
  }
}
