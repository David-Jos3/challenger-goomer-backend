/* eslint-disable @stylistic/max-len */
import { InMemoryProductRepository } from './../../../test/repositories/in-memory-product-repository'
import { beforeEach, describe, test, expect } from 'vitest'
import { RegisterProductRestaurantUseCase } from './register-product-restaurant'

describe('Register Product the Restaurant', async () => {
  let inMemoryProductRepository: InMemoryProductRepository
  let sut: RegisterProductRestaurantUseCase

  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository()
    sut = new RegisterProductRestaurantUseCase(inMemoryProductRepository)
  })

  test('should be able to register one product the of restaurant', async () => {
    const { product } = await sut.execute({
      name: 'Test Product',
      photoUrl: 'test-photo-url',
      price: 10,
      restaurantId: 'test-restaurant-id',
      category: 'test-category',
      createdAt: new Date(),
    })
    const result = await inMemoryProductRepository.findById(product.id)

    expect(result).not.toBeNull()
    expect(result!.name).toBe('Test Product')
  })
})
