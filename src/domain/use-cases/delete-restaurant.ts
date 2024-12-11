import { ResourceNotFoundException } from '../../core/errors/resource-not-found'
import { RestaurantRepository } from '../repositories/restaurant-repository.'

interface DeleteRestaurantUseCaseRequest {
  restaurantId: string
}

export class DeleteRestaurantUseCase {
  constructor(private restaurantRepository: RestaurantRepository) {}

  async execute({ restaurantId }
  : DeleteRestaurantUseCaseRequest): Promise<object> {
    const restaurant = await this.restaurantRepository.findById(restaurantId)

    if (!restaurant) {
      throw new ResourceNotFoundException()
    }
    await this.restaurantRepository.delete(restaurantId)

    return { }
  }
}
