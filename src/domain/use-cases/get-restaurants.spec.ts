// eslint-disable-next-line @stylistic/max-len
import { InMemoryRestaurantsRepository } from './../../../test/repositories/in-memory-restaurants-repository'
import { beforeEach, describe, test, expect } from 'vitest'
import { Restaurant } from '../entities/restaurant'
import { GetRestaurantsUseCase } from './get-restaurants'

describe('Get restaurant ', () => {
  let inMemoryRestaurantsRepository: InMemoryRestaurantsRepository
  let sut: GetRestaurantsUseCase
  beforeEach(() => {
    inMemoryRestaurantsRepository = new InMemoryRestaurantsRepository()
    sut = new GetRestaurantsUseCase(inMemoryRestaurantsRepository)
  })

  test('must be able to return all the restaurant', async () => {
    for (let i = 0; i < 10; i++) {
      const restaurant = new Restaurant({
        name: `restaurant-${i}`,
        address: `address-${i}`,
        photoUrl: `photo-url-${i}`,
        createdAt: new Date(),
      }, `test-restaurant-${i}`)
      await inMemoryRestaurantsRepository.create(restaurant)
    }

    const result = await sut.execute()

    expect(result.restaurants.length).toBe(10)
  })
})
