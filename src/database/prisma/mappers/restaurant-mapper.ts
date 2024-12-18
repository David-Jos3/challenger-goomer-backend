/* eslint-disable @stylistic/max-len */
import { Restaurant as PrismaRestaurant, Product as PrismaProduct, OpeningHour as PrismaOpeningHour, Prisma } from '@prisma/client'
import { Restaurant } from '../../../domain/entities/restaurant'

type PrismaRestaurantWithRelations = PrismaRestaurant & {
  Product: PrismaProduct[];
  OpeningHour: PrismaOpeningHour[];
}

export class PrismaRestaurantMapper {
  static toDomain(raw: PrismaRestaurantWithRelations): Restaurant {
    return new Restaurant({
      name: raw.name,
      address: raw.address,
      photoUrl: raw.photoUrl,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      product: raw.Product.map(products => ({
        id: products.id.toString(),
        name: products.name,
        photoUrl: products.photoUrl,
        restaurantId: raw.id,
        promotionTime: [],
        price: products.price.toNumber(),
        category: products.category,
        createdAt: products.createdAt,
      })),
      openingHours: raw.OpeningHour.map(openingHour => ({
        dayOfWeek: openingHour.dayOfWeek,
        endTime: openingHour.endTime,
        startTime: openingHour.startTime,
        restaurantId: raw.id,
      })),
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
