import { Restaurant } from '../../domain/entities/restaurant'

export interface RestaurantRepository {
  create(restaurant: Restaurant): Promise<Restaurant>
  findByName(name: string): Promise<Restaurant | null>
  findByAddress(address: string): Promise<Restaurant | null>
  findById(restaurantId: string): Promise<Restaurant | null>
}