/* eslint-disable @stylistic/max-len */
import { Product } from '../../src/domain/entities/product'
import { ProductRepository } from '../../src/domain/repositories/product-repository'

export class InMemoryProductRepository implements ProductRepository {
  private products: Product[] = []

  async create(product: Product): Promise<Product> {
    this.products.push(product)
    return product
  }

  async findById(productId: string): Promise<Product | null> {
    return this.products.find((r) => r.id === productId) ?? null
  }
}
