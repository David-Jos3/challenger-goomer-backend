/* eslint-disable @stylistic/max-len */
import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryOpeningHourRepository } from '../../../test/repositories/in-memory-openig-hour-repository'
import { CreateOpeningHourUseCase } from './create-opening-hour'
import { InvalidFormatHoursException } from './errors/invalid-format-hour-exception'
import { InvalidTimeIntervalException } from './errors/invalid-time-interval-exception'
import { InvalidTimeOrderException } from './errors/invalid-time-order-exception'

describe('Create Openig hour', () => {
  let inMemoryOpeningHourRepository: InMemoryOpeningHourRepository
  let sut: CreateOpeningHourUseCase
  beforeEach(() => {
    inMemoryOpeningHourRepository = new InMemoryOpeningHourRepository()
    sut = new CreateOpeningHourUseCase(inMemoryOpeningHourRepository)
  })
  test('should create a new opening hour for a restaurant', async () => {
    const { openingHour } = await sut.execute({
      dayOfWeek: 'Monday',
      startTime: '09:00',
      endTime: '18:00',
      restaurantId: 'test-restaurant-id',
    })
    const storedOpeningHour = await inMemoryOpeningHourRepository.findById(openingHour.id)

    expect(storedOpeningHour).not.toBeNull()
  })
  test('should be able to return error Invalid Format  ', async () => {
    await expect(
      sut.execute({
        dayOfWeek: 'Monday',
        startTime: '25:00',
        endTime: '18:0',
        restaurantId: 'test-restaurant-id',
      }),
    ).rejects.toThrow(InvalidFormatHoursException)
  })

  test('should return an error if the time difference is less than 15 minutes', async () => {
    await expect(
      sut.execute({
        dayOfWeek: 'Monday',
        startTime: '09:00',
        endTime: '09:12',
        restaurantId: 'test-restaurant-id',
      }),
    ).rejects.toThrow(InvalidTimeIntervalException)
  })

  test('should return an error if the start time is greater than the end time', async () => {
    await expect(
      sut.execute({
        dayOfWeek: 'Monday',
        startTime: '08:45',
        endTime: '07:45',
        restaurantId: 'test-restaurant-id',
      }),
    ).rejects.toThrow(InvalidTimeOrderException)
  })
})
