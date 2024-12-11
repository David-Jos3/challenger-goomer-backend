import { ResourceNotFoundException } from '../../core/errors/resource-not-found'
import { Restaurant } from '../entities/restaurant'
import { RestaurantRepository } from '../repositories/restaurant-repository.'

interface GetRestaurantByIdUseCaseRequest {
  restaurantId: string
}

interface GetRestaurantByIdUseCaseResponse {
  restaurant: Restaurant
}

export class GetRestaurantByIdUseCase {
  constructor(private restaurantRepository: RestaurantRepository) {}

  async execute({ restaurantId }: GetRestaurantByIdUseCaseRequest)
    : Promise<GetRestaurantByIdUseCaseResponse> {
    const restaurant = await this.restaurantRepository.findById(restaurantId)

    if (!restaurant) {
      throw new ResourceNotFoundException()
    }

    return { restaurant }
  }
}
