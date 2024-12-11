/* eslint-disable @stylistic/max-len */
import { InvalidFormatHoursException } from '../use-cases/errors/invalid-format-hour-exception'
import { InvalidTimeIntervalException } from '../use-cases/errors/invalid-time-interval-exception'
import { InvalidTimeOrderException } from '../use-cases/errors/invalid-time-order-exception'

export const validateTime = async (startTime: string, endTime: string) => {
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
}
