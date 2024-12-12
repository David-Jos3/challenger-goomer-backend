/* eslint-disable @stylistic/max-len */
import { beforeEach, describe, test, expect } from 'vitest'
import { InMemoryProductRepository } from '../../../test/repositories/in-memory-product-repository'
import { GetProductRestaurantsUseCase } from './get-products-restaurants'
import { Product } from '../entities/product'

describe('Get product the restaurant ', () => {
  let inMemoryProductRepository: InMemoryProductRepository
  let sut: GetProductRestaurantsUseCase
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository()
    sut = new GetProductRestaurantsUseCase(inMemoryProductRepository)
  })

  test('must be able to return all product the restaurant', async () => {
    for (let i = 0; i < 10; i++) {
      const newProduct = new Product({
        name: `restaurant-${i}`,
        category: `categories-${i}`,
        price: i * 10,
        restaurantId: `restaurant-${i}`,
        photoUrl: `photo-url-${i}`,
        createdAt: new Date(),
      }, `test-restaurant-${i}`)
      await inMemoryProductRepository.create(newProduct)
    }

    const result = await sut.execute()

    expect(result.products.length).toBe(10)
  })
})
