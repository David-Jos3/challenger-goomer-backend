import { ResourceNotFoundException } from '../../core/errors/resource-not-found'
import { Restaurant } from '../entities/restaurant'
import { RestaurantRepository } from '../repositories/restaurant-repository.'

interface UpdateRestaurantUseCaseRequest {
  restaurantId: string
  name?: string
  address?: string
  photoUrl?: string
  updatedAt: Date

}

interface UpdateRestaurantUseCaseResponse {
  restaurant: Restaurant
}

export class UpdateRestaurantUseCase {
  constructor(private restaurantRepository: RestaurantRepository) {}

  async execute({
    restaurantId,
    address,
    name,
    photoUrl,
  }: UpdateRestaurantUseCaseRequest)
    :Promise<UpdateRestaurantUseCaseResponse> {
    const restaurant = await this.restaurantRepository.findById(restaurantId)
    if (!restaurant) {
      throw new ResourceNotFoundException()
    }

    restaurant.name = name ?? restaurant.name
    restaurant.address = address ?? restaurant.address
    restaurant.photoUrl = photoUrl ?? restaurant.photoUrl
    restaurant.updatedAt = new Date()

    await this.restaurantRepository.update(restaurant)

    return { restaurant }
  }
}
