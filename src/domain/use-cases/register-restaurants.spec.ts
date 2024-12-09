/* eslint-disable @stylistic/max-len */
import { InMemoryRestaurantsRepository } from './../../../test/repositories/in-memory-restaurants-repository'
import { beforeEach, expect, test, describe } from 'vitest'
import { RegisterRestaurantUseCase } from './register-restaurants'

let inMemoryRestaurantsRepository: InMemoryRestaurantsRepository
let sut: RegisterRestaurantUseCase
describe('Resgister Restaurants', async () => {
  beforeEach(() => {
    inMemoryRestaurantsRepository = new InMemoryRestaurantsRepository()
    sut = new RegisterRestaurantUseCase(inMemoryRestaurantsRepository)
  })

  test('should register a new restaurant', async () => {
    const { restaurant } = await sut.execute({
      name: 'Test Restaurant',
      address: 'Test Address',
      photoUrl: 'test-photo-url',
      createdAt: new Date(),
    })
    const storedRestaurants = await inMemoryRestaurantsRepository.findById(restaurant.id)
    expect(storedRestaurants).not.toBeNull()
    expect(storedRestaurants!.name).toBe('Test Restaurant')
    expect(storedRestaurants!.address).toBe('Test Address')
  })
})
