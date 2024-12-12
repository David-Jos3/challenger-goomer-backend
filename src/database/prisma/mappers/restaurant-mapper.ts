/* eslint-disable @stylistic/max-len */
import { Restaurant as PrismaRestaurant, Prisma } from '@prisma/client'
import { Restaurant } from '../../../domain/entities/restaurant'

export class PrismaRestaurantMapper {
  static toDomain(raw: PrismaRestaurant): Restaurant {
    return new Restaurant({
      name: raw.name,
      address: raw.address,
      photoUrl: raw.photoUrl,
      createdAt: raw.createdAt,
    }, raw.id)
  }

  static toPrisma(restaurant: Restaurant): Prisma.RestaurantUncheckedCreateInput {
    return {
      id: restaurant.id.toString(),
      name: restaurant.name,
      address: restaurant.address,
      photoUrl: restaurant.photoUrl,
      createdAt: restaurant.createdAt,
      updatedAt: restaurant.updatedAt,
    }
  }
}
