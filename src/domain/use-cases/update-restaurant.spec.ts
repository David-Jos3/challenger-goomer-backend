/* eslint-disable @stylistic/max-len */
import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryRestaurantsRepository } from '../../../test/repositories/in-memory-restaurants-repository'
import { UpdateRestaurantUseCase } from './update-restaurant'
import { Restaurant } from '../entities/restaurant'

describe('Update Restaurant ', async () => {
  let inMemoryRestaurantsRepository: InMemoryRestaurantsRepository
  let sut: UpdateRestaurantUseCase

  beforeEach(() => {
    inMemoryRestaurantsRepository = new InMemoryRestaurantsRepository()
    sut = new UpdateRestaurantUseCase(inMemoryRestaurantsRepository)
  })

  test('should update restaurant details when provided valid data', async () => {
    const newRestaurants = new Restaurant({
      address: 'Rua machado 98',
      name: 'Novo nome',
      photoUrl: 'nova-foto.jpg',
      createdAt: new Date(),
    })

    await inMemoryRestaurantsRepository.create(newRestaurants)

    const { restaurant } = await sut.execute({
      address: 'Rua machado 90',
      name: 'Novo nome alterado',
      photoUrl: 'nova-foto-alterada.jpg',
      restaurantId: newRestaurants.id,
    })
    const result = await inMemoryRestaurantsRepository.findById(restaurant.id)

    expect(result?.address).toBe('Rua machado 90')
  })
})
