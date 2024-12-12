/* eslint-disable @stylistic/max-len */
import { InMemoryProductRepository } from '../../../test/repositories/in-memory-product-repository'
import { beforeEach, describe, test, expect } from 'vitest'
import { GetProductRestaurantByIdUseCase } from './get-product-restaurant-by-id'
import { Product } from '../entities/product'

describe('Get Product the restaurant by id', () => {
  let inMemoryProductRepository: InMemoryProductRepository
  let sut: GetProductRestaurantByIdUseCase
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository()
    sut = new GetProductRestaurantByIdUseCase(inMemoryProductRepository)
  })

  test('should return a product the restaurant by id', async () => {
    for (let i = 0; i < 10; i++) {
      const product = new Product({
        name: `restaurant-${i}`,
        category: `category-${i}`,
        price: i * 10,
        restaurantId: `restaurant-${i}`,
        photoUrl: `photo-url-${i}`,
        createdAt: new Date(),
      }, `test-product-${i}`)
      await inMemoryProductRepository.create(product)
    }

    const result = await sut.execute({
      productId: 'test-product-5',
    })

    expect(result.product.id).toBe('test-product-5')
  })
})
