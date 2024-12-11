/* eslint-disable @stylistic/max-len */
import { InMemoryRestaurantsRepository } from './../../../test/repositories/in-memory-restaurants-repository'
import { beforeEach, expect, test, describe } from 'vitest'
import { RegisterRestaurantUseCase } from './register-restaurants'
import { RestaurantConflictException } from './errors/restaurant-conflict-exception'

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
    const result = await inMemoryRestaurantsRepository.findById(restaurant.id)
    expect(result).not.toBeNull()
    expect(result!.name).toBe('Test Restaurant')
    expect(result!.address).toBe('Test Address')
  })

  test('should be able to not register restaurant same name iqual and adress', async () => {
    await sut.execute({
      name: 'Test Restaurant',
      address: 'Test Address',
      photoUrl: 'test-photo-url',
      createdAt: new Date(),
    })
    await expect(
      sut.execute({
        name: 'Test Restaurant',
        address: 'Test Address',
        photoUrl: 'test-photo-url',
        createdAt: new Date(),
      }),
    ).rejects.toThrow(RestaurantConflictException)
  })
})
