import { app } from '../../../app'
// eslint-disable-next-line @stylistic/max-len
import { CreateOpeningHourController } from '../create-opening-hour/create-opening-hour.controller'

export class PromotionTimeRouter {
  static async routes() {
    app.post('/promotion-time', CreateOpeningHourController.create)
  }
}
