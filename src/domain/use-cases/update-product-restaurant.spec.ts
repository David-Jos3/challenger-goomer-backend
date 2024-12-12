/* eslint-disable @stylistic/max-len */
import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryProductRepository } from '../../../test/repositories/in-memory-product-repository'
import { UpdateProductRestaurantUseCase } from './update-product-restaurant'
import { Product } from '../entities/product'

describe('Update Product the Restaurant ', async () => {
  let inMemoryProductRepository: InMemoryProductRepository
  let sut: UpdateProductRestaurantUseCase

  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository()
    sut = new UpdateProductRestaurantUseCase(inMemoryProductRepository)
  })

  test('should update restaurant details when provided valid data', async () => {
    const newProduct = new Product({
      name: 'Novo nome',
      category: 'category-a',
      price: 10,
      restaurantId: 'test-restaurant-id',
      photoUrl: 'nova-foto.jpg',
      createdAt: new Date(),
    })

    await inMemoryProductRepository.create(newProduct)

    const { product } = await sut.execute({
      name: 'Novo nome alterado',
      category: 'category-b',
      price: 20,
      productId: newProduct.id,
      photoUrl: 'nova-foto-alterada.jpg',
    })
    const result = await inMemoryProductRepository.findById(product.id)

    expect(result?.category).toBe('category-b')
  })
})
