// eslint-disable-next-line @stylistic/max-len
import { InMemoryRestaurantsRepository } from './../../../test/repositories/in-memory-restaurants-repository'
import { beforeEach, describe, test, expect } from 'vitest'
import { GetRestaurantByIdUseCase } from './get-restaurant-by-id'
import { Restaurant } from '../entities/restaurant'

describe('Get restaurant by id', () => {
  let inMemoryRestaurantsRepository: InMemoryRestaurantsRepository
  let sut: GetRestaurantByIdUseCase
  beforeEach(() => {
    inMemoryRestaurantsRepository = new InMemoryRestaurantsRepository()
    sut = new GetRestaurantByIdUseCase(inMemoryRestaurantsRepository)
  })

  test('should return a restaurant by id', async () => {
    for (let i = 0; i < 10; i++) {
      const restaurant = new Restaurant({
        name: `restaurant-${i}`,
        address: `address-${i}`,
        photoUrl: `photo-url-${i}`,
        createdAt: new Date(),
      }, `test-restaurant-${i}`)
      await inMemoryRestaurantsRepository.create(restaurant)
    }

    const result = await sut.execute({
      restaurantId: 'test-restaurant-5',
    })

    expect(result.restaurant.id).toBe('test-restaurant-5')
  })
})
