import { RegisterRestaurantController } from './register-restaurant.controller'
import { app } from '../../../app'
import { ListRestaurantController } from './list-restaurants.controller'
import { DeleteRestaurantController } from './delete-restaurants.controller'
import { UpdateRestaurantController } from './update-restaurant.controller'

export class RestaurantRouter {
  static async routes() {
    app.post('/restaurants', RegisterRestaurantController.create)
    app.get('/restaurants', ListRestaurantController.findAll)
    app.delete('/restaurants/:id', DeleteRestaurantController.delete)
    app.put('/restaurants/:id', UpdateRestaurantController.update)
  }
}
