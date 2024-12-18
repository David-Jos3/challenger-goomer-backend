/* eslint-disable @stylistic/max-len */
import { app } from '../../../app'
import { DeleteProductRestaurantController } from './delete-product-restaurant.controller'
import { ListProductRestaurantByIdController } from './list-product-restaurant-by-id.controller'
import { ListProductRestaurantController } from './list-product-restaurant.controller'
import { RegisterProductRestaurantsController } from './register-product-restaurant.controller'
import { UpdateProductRestaurantController } from './update-product-restaurant.controller'

export class ProductRestaurantRouter {
  static async routes() {
    app.post('/products', RegisterProductRestaurantsController.create)
    app.get('/products', ListProductRestaurantController.findAll)
    app.get('/products/:id', ListProductRestaurantByIdController.findById)
    app.put('/products/:id', UpdateProductRestaurantController.update)
    app.delete('/products/:id', DeleteProductRestaurantController.delete)
  }
}
