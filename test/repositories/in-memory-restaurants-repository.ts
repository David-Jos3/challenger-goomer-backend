/* eslint-disable @stylistic/max-len */
import { Restaurant } from '../../src/domain/entities/restaurant'
import { RestaurantRepository } from '../../src/domain/repositories/restaurant-repository.'

export class InMemoryRestaurantsRepository implements RestaurantRepository {
  private restaurants: Restaurant[] = []

  async create(restaurant: Restaurant): Promise<Restaurant> {
    this.restaurants.push(restaurant)
    return restaurant
  }

  async findById(restaurantId: string): Promise<Restaurant | null> {
    return this.restaurants.find((r) => r.id === restaurantId) ?? null
  }

  async findByName(name: string): Promise<Restaurant | null> {
    return this.restaurants.find((r) => r.name === name) ?? null
  }

  async findByAddress(address: string): Promise<Restaurant | null> {
    return this.restaurants.find((r) => r.address === address) ?? null
  }
}
