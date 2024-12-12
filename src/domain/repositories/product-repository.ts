import { Product } from '../../domain/entities/product'

export interface ProductRepository {
  create(product: Product): Promise<void>
  findById(productId: string): Promise<Product | null>
  findAll(): Promise<Product[]>
  delete(productId: string): Promise<void>
  update(product: Product): Promise<void>
}
