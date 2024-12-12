import { ResourceNotFoundException } from '../../core/errors/resource-not-found'
import { ProductRepository } from '../repositories/product-repository'

interface DeleteProductRestaurantUseCaseRequest {
  productId: string
}

export class DeleteProductRestaurantUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({ productId }
  : DeleteProductRestaurantUseCaseRequest): Promise<object> {
    const product = await this.productRepository.findById(productId)

    if (!product) {
      throw new ResourceNotFoundException()
    }
    await this.productRepository.delete(productId)

    return { }
  }
}
