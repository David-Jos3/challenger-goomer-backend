/* eslint-disable @stylistic/max-len */
import { app } from '../../../app'
import { RegisterProductRestaurantsController } from './register-product-restaurant.controller'

export class ProductRestaurantRouter {
  static async routes() {
    app.post('/products', RegisterProductRestaurantsController.create)
  }
}
