import { ResourceNotFoundException } from '../../core/errors/resource-not-found'
import { Restaurant } from '../entities/restaurant'
import { RestaurantRepository } from '../repositories/restaurant-repository.'

interface UpdateRestaurantUseCaseRequest {
  restaurantId: string
  name: string
  address: string
  photoUrl: string
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

    // const updatedRestaurant = Object.assign(restaurant, {
    //   ...(name && { name }),
    //   ...(address && { address }),
    //   ...(photoUrl && { photoUrl }),
    // })

    restaurant.name = name
    restaurant.address = address
    restaurant.photoUrl = photoUrl

    await this.restaurantRepository.update(restaurant)

    return { restaurant }
  }
}
