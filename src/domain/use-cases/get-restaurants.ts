import { ResourceNotFoundException } from '../../core/errors/resource-not-found'
import { Restaurant } from '../entities/restaurant'
import { RestaurantRepository } from '../repositories/restaurant-repository.'

interface GetRestaurantsUseCaseResponse {
  restaurants: Restaurant[]
}

export class GetRestaurantsUseCase {
  constructor(private restaurantRespository: RestaurantRepository) {}

  async execute(): Promise<GetRestaurantsUseCaseResponse> {
    const restaurants = await this.restaurantRespository.findAll()
    if (!restaurants) {
      throw new ResourceNotFoundException()
    }
    return { restaurants }
  }
}
