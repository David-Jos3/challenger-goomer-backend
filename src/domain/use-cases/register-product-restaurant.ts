import { Product } from '../entities/product'
import { ProductRepository } from '../repositories/product-repository'
import { InvalidPriceException } from './errors/invalid-price-exception'

interface RegisterProductRestaurantUseCaseRequest {
  name: string
  photoUrl: string
  price: number
  restaurantId: string
  category: string
  createdAt: Date
}

interface RegisterProductRestaurantUseCaseResponse {
  product: Product
}

export class RegisterProductRestaurantUseCase {
  constructor(private productRepository: ProductRepository) {}
  async execute({
    name,
    photoUrl,
    price,
    restaurantId,
    category,
    createdAt,
  }:RegisterProductRestaurantUseCaseRequest)
    : Promise<RegisterProductRestaurantUseCaseResponse> {
    if (price <= 0) throw new InvalidPriceException()

    const product = new Product({
      name,
      photoUrl,
      price,
      category,
      createdAt,
      restaurantId,
    })
    await this.productRepository.create(product)
    return { product }
  }
}
