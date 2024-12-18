import { app } from '../../../app'

import { CreatePromotionTimeController } from './create-promotion.controller'

export class PromotionTimeRouter {
  static async routes() {
    app.post('/promotion-time', CreatePromotionTimeController.create)
  }
}
