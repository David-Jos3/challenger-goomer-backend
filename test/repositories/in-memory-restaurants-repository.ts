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

  async findAll(): Promise<Restaurant[]> {
    return this.restaurants
  }

  async delete(restaurantId: string): Promise<void> {
    this.restaurants.filter((r) => r.id !== restaurantId)
  }

  async update(restaurant: Restaurant): Promise<Restaurant> {
    const index = this.restaurants.findIndex(i => i.id === restaurant.id)
    if (index !== -1) {
      this.restaurants[index] = restaurant
    }
    return restaurant
  }
}
