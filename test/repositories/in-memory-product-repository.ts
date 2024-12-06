/* eslint-disable @stylistic/max-len */
import { ProductRepository } from '../../src/database/repositories/product-repository'
import { Product } from '../../src/domain/entities/product'

export class InMemoryProductRepository implements ProductRepository {
  private restaurants: Product[] = []

  async create(product: Product): Promise<Product> {
    this.restaurants.push(product)
    return product
  }

  async findById(productId: string): Promise<Product | null> {
    return this.restaurants.find((r) => r.id === productId) ?? null
  }
}
