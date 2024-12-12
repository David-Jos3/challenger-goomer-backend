import { Restaurant } from '../../domain/entities/restaurant'

export interface RestaurantRepository {
  create(restaurant: Restaurant): Promise<void>
  findByName(name: string): Promise<Restaurant | null>
  findByAddress(address: string): Promise<Restaurant | null>
  findById(restaurantId: string): Promise<Restaurant | null>
  findAll(): Promise<Restaurant[]>
  delete(restaurantId: string): Promise<void>
  update(restaurant: Restaurant): Promise<void>
}
