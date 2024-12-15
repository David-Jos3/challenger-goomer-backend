import { app } from '../../../app'
import { CreateOpeningHourController } from './create-opening-hour.controller'

export class OpeningHourRouter {
  static async create() {
    app.post('/opening-hour', CreateOpeningHourController.create)
  }
}
