/* eslint-disable @stylistic/max-len */
import { Product } from '../../src/domain/entities/product'
import { ProductRepository } from '../../src/domain/repositories/product-repository'

export class InMemoryProductRepository implements ProductRepository {
  private products: Product[] = []

  async create(product: Product): Promise<void> {
    this.products.push(product)
  }

  async findById(productId: string): Promise<Product | null> {
    return this.products.find((r) => r.id === productId) ?? null
  }

  async findAll(): Promise<Product[]> {
    return this.products
  }

  async delete(productId: string): Promise<void> {
    this.products.filter((r) => r.id !== productId)
  }

  async update(product: Product): Promise<void> {
    const index = this.products.findIndex(i => i.id === product.id)
    if (index !== -1) {
      this.products[index] = product
    }
  }
}
