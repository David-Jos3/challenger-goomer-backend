/* eslint-disable @stylistic/max-len */
import { beforeEach, describe, test, expect } from 'vitest'
import { CreatePromotionTimeUseCase } from './create-promotion-time'
import { InMemoryPromotionTimeRepository } from '../../../test/repositories/in-memory-promotion-time-repository'
import { InvalidFormatHoursException } from './errors/invalid-format-hour-exception'
import { InvalidTimeIntervalException } from './errors/invalid-time-interval-exception'
import { InvalidTimeOrderException } from './errors/invalid-time-order-exception'
import { InvalidPriceException } from './errors/invalid-price-exception'
describe('Create Promotion Time', async () => {
  let inMemoryPromotionTimeRepository: InMemoryPromotionTimeRepository
  let sut: CreatePromotionTimeUseCase

  beforeEach(() => {
    inMemoryPromotionTimeRepository = new InMemoryPromotionTimeRepository()
    sut = new CreatePromotionTimeUseCase(inMemoryPromotionTimeRepository)
  })

  test('Should be able create to promotion Time', async () => {
    const { promotionTime } = await sut.execute({
      dayOfWeek: 'Monday',
      startTime: '09:00',
      endTime: '18:00',
      price: 10,
      description: 'Test Promotion Time',
      productId: 'test-product-id',
    })
    const resutl = await inMemoryPromotionTimeRepository.findById(promotionTime.id)
    expect(resutl?.dayOfWeek).toBe('Monday')
    expect(promotionTime).toBeTruthy()
  })
  test('should be able to return error Invalid Format  ', async () => {
    await expect(
      sut.execute({
        dayOfWeek: 'Monday',
        startTime: '25:00',
        endTime: '18:0',
        price: 10.20,
        description: 'test',
        productId: 'test-product-id',
      }),
    ).rejects.toThrow(InvalidFormatHoursException)
  })

  test('should return an error if the time difference is less than 15 minutes', async () => {
    await expect(
      sut.execute({
        dayOfWeek: 'Monday',
        startTime: '19:00',
        endTime: '19:12',
        price: 10.90,
        description: 'test',
        productId: 'test-product-id',
      }),
    ).rejects.toThrow(InvalidTimeIntervalException)
  })

  test('should return an error if the start time is greater than the end time', async () => {
    await expect(
      sut.execute({
        dayOfWeek: 'Monday',
        startTime: '18:00',
        endTime: '17:59',
        price: 10.98,
        description: 'test',
        productId: 'test-product-id',
      }),
    ).rejects.toThrow(InvalidTimeOrderException)
  })
  test('should return an error if the price is less than or equal to 0', async () => {
    await expect(
      sut.execute({
        dayOfWeek: 'Monday',
        startTime: '19:00',
        endTime: '19:20',
        price: -2,
        description: 'test',
        productId: 'test-product-id',
      }),
    ).rejects.toThrow(InvalidPriceException)
  })
})
