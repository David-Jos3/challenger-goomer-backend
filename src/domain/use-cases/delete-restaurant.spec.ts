// eslint-disable-next-line @stylistic/max-len
import { InMemoryRestaurantsRepository } from './../../../test/repositories/in-memory-restaurants-repository'
import { beforeEach, describe, test, expect } from 'vitest'
import { Restaurant } from '../entities/restaurant'
import { DeleteRestaurantUseCase } from './delete-restaurant'
import { ResourceNotFoundException } from '../../core/errors/resource-not-found'

describe('Delete restaurant ', () => {
  let inMemoryRestaurantsRepository: InMemoryRestaurantsRepository
  let sut: DeleteRestaurantUseCase
  beforeEach(() => {
    inMemoryRestaurantsRepository = new InMemoryRestaurantsRepository()
    sut = new DeleteRestaurantUseCase(inMemoryRestaurantsRepository)
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
    expect(result).toEqual({})
  })

  test('should throw an error if restaurant does not exist', async () => {
    await expect(
      sut.execute({ restaurantId: 'non-existent-id' }),
    ).rejects.toThrow(ResourceNotFoundException)
  })
})
