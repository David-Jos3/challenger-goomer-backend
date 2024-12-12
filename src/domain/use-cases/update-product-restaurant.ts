import { ResourceNotFoundException } from '../../core/errors/resource-not-found'
import { Product } from '../entities/product'
import { ProductRepository } from '../repositories/product-repository'

interface UpdateProductRestaurantUseCaseRequest {
  name: string
  photoUrl: string
  price: number
  productId: string
  category: string
}
interface UpdateProductRestaurantUseCaseResponse {
  product: Product
}

export class UpdateProductRestaurantUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    category,
    price,
    productId,
    name,
    photoUrl,
  }: UpdateProductRestaurantUseCaseRequest)
    :Promise<UpdateProductRestaurantUseCaseResponse> {
    const product = await this.productRepository.findById(productId)

    if (!product) {
      throw new ResourceNotFoundException()
    }

    product.name = name
    product.price = price
    product.photoUrl = photoUrl
    product.category = category

    await this.productRepository.update(product)

    return { product }
  }
}
