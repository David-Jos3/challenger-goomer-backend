/* eslint-disable @stylistic/max-len */
import { OpeningHour } from '../entities/opening-hour'
import { OpeningHourRepository } from '../repositories/opening-hour-repository'
import { InvalidFormatHoursException } from './errors/invalid-format-hour-exception'
import { InvalidTimeIntervalException } from './errors/invalid-time-interval-exception'
import { InvalidTimeOrderException } from './errors/invalid-time-order-exception'

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
    const timeRegex = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/

    if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
      throw new InvalidFormatHoursException()
    }

    const toMinutes = (time:string) => {
      const [hours, minutes] = time.split(':').map(Number)
      return hours * 60 + minutes
    }

    const resultStartTime = toMinutes(startTime)
    const resultEndTime = toMinutes(endTime)

    if (resultStartTime >= resultEndTime) {
      throw new InvalidTimeOrderException()
    }

    if (resultEndTime - resultStartTime < 15) {
      throw new InvalidTimeIntervalException()
    }

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
