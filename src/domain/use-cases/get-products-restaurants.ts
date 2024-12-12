import { ResourceNotFoundException } from '../../core/errors/resource-not-found'
import { Product } from '../entities/product'
import { ProductRepository } from '../repositories/product-repository'

interface GetProductsRestaurantsUseCaseResponse {
  products: Product[]
}

export class GetProductRestaurantsUseCase {
  constructor(private productRespository: ProductRepository) {}
  async execute(): Promise<GetProductsRestaurantsUseCaseResponse> {
    const products = await this.productRespository.findAll()
    if (!products) {
      throw new ResourceNotFoundException()
    }
    return { products }
  }
}
