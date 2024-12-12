import { ResourceNotFoundException } from '../../core/errors/resource-not-found'
import { Product } from '../entities/product'
import { ProductRepository } from '../repositories/product-repository'

interface GetProductRestaurantByIdUseCaseRequest {
  productId: string
}

interface GetProductRestaurantByIdUseCaseResponse {
  product: Product
}

export class GetProductRestaurantByIdUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({ productId }: GetProductRestaurantByIdUseCaseRequest)
    : Promise<GetProductRestaurantByIdUseCaseResponse> {
    const product = await this.productRepository.findById(productId)

    if (!product) {
      throw new ResourceNotFoundException()
    }

    return { product }
  }
}
