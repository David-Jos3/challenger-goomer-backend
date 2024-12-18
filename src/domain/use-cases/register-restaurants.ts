/* eslint-disable @stylistic/max-len */
import { Restaurant } from '../entities/restaurant'
import { RestaurantRepository } from '../repositories/restaurant-repository.'
import { RestaurantConflictException } from './errors/restaurant-conflict-exception'

interface RegisterRestaurantRequest {
  name: string
  address: string
  photoUrl: string
  createdAt?: Date
  updatedAt?: Date
}

interface RegisterRestaurantResponse {
  restaurant: Restaurant
}

export class RegisterRestaurantUseCase {
  constructor(private restaurantRespository: RestaurantRepository) {}

  async execute({ name, address, photoUrl }: RegisterRestaurantRequest)
    : Promise<RegisterRestaurantResponse> {
    const existingRestaurantByName = await this.restaurantRespository.findByName(name)
    const existingRestaurantByAdress = await this.restaurantRespository.findByAddress(address)

    const restaurant = new Restaurant({
      name,
      address,
      photoUrl,
      createdAt: new Date(),
      updatedAt: null,
      product: [],
      openingHours: [],
    })

    if (existingRestaurantByName && existingRestaurantByAdress) {
      throw new RestaurantConflictException()
    }
    await this.restaurantRespository.create(restaurant)

    return { restaurant }
  }
}
