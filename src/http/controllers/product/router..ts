/* eslint-disable @stylistic/max-len */
import { app } from '../../../app'
import { RegisterProductRestaurantsController } from './register-product-restaurant.controller'

export class RegisterProductRestaurantRouter {
  static async create() {
    app.post('/products', RegisterProductRestaurantsController.create)
  }
}
