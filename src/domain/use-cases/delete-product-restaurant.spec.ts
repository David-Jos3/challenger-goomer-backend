/* eslint-disable @stylistic/max-len */
import { beforeEach, describe, test, expect } from 'vitest'
import { ResourceNotFoundException } from '../../core/errors/resource-not-found'
import { InMemoryProductRepository } from '../../../test/repositories/in-memory-product-repository'
import { DeleteProductRestaurantUseCase } from './delete-product-restaurant'
import { Product } from '../entities/product'

describe('Delete Product the restaurant ', () => {
  let inMemoryProductRepository: InMemoryProductRepository
  let sut: DeleteProductRestaurantUseCase
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository()
    sut = new DeleteProductRestaurantUseCase(inMemoryProductRepository)
  })

  test('should return a restaurant by id', async () => {
    for (let i = 0; i < 10; i++) {
      const product = new Product({
        name: `restaurant-${i}`,
        photoUrl: `photo-url-${i}`,
        createdAt: new Date(),
        price: i * 10,
        category: `category-${i}`,
        restaurantId: `restaurant-${i}`,
      }, `test-product-${i}`)
      await inMemoryProductRepository.create(product)
    }

    const result = await sut.execute({
      productId: 'test-product-5',
    })
    expect(result).toEqual({})
  })

  test('should throw an error if produt the restaurant does not exist', async () => {
    await expect(
      sut.execute({ productId: 'non-existent-id' }),
    ).rejects.toThrow(ResourceNotFoundException)
  })
})
