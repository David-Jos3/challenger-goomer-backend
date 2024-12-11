/* eslint-disable @stylistic/max-len */
import { OpeningHour } from '../entities/opening-hour'
import { OpeningHourRepository } from '../repositories/opening-hour-repository'
import { validateTime } from '../utils/validate-time'

interface CreateOpeningHourUseCaseRequest {
  dayOfWeek: string
  startTime: string
  endTime: string
  restaurantId: string
}

interface CreateOpeningHourUseCaseResponse {
  openingHour: OpeningHour
}

export class CreateOpeningHourUseCase {
  constructor(private openingHourRepository: OpeningHourRepository) {}

  async execute({ dayOfWeek, startTime, endTime, restaurantId }: CreateOpeningHourUseCaseRequest)
    :Promise<CreateOpeningHourUseCaseResponse> {
    await validateTime(startTime, endTime)

    const openingHour = new OpeningHour({
      dayOfWeek,
      startTime,
      endTime,
      restaurantId,
    })

    await this.openingHourRepository.create(openingHour)

    return { openingHour }
  }
}
