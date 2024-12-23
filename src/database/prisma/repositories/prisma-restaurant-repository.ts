/* eslint-disable @stylistic/max-len */
import { Restaurant } from '../../../domain/entities/restaurant'
import { RestaurantRepository } from '../../../domain/repositories/restaurant-repository.'
import { PrismaRestaurantMapper } from '../mappers/restaurant-mapper'
import { prisma } from '../../../lib/prisma-service'

export class PrismaRestaurantRepository implements RestaurantRepository {
  async create(restaurant: Restaurant): Promise<void> {
    const data = PrismaRestaurantMapper.toPrisma(restaurant)
    await prisma.restaurant.create({
      data,
    })
  }

  async findByName(name: string): Promise<Restaurant | null> {
    const restaurant = await prisma.restaurant.findFirst({
      where: { name },
      include: { OpeningHour: true, Product: true },
    })

    if (!restaurant) {
      return null
    }
    return PrismaRestaurantMapper.toDomain(restaurant)
  }

  async findByAddress(address: string): Promise<Restaurant | null> {
    const restaurant = await prisma.restaurant.findFirst({
      where: { address },
      include: { OpeningHour: true, Product: true },
    })

    if (!restaurant) {
      return null
    }
    return PrismaRestaurantMapper.toDomain(restaurant)
  }

  async findById(restaurantId: string): Promise<Restaurant | null> {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
      include: {
        Product: true,
        OpeningHour: true,
      },
    })

    if (!restaurant) {
      return null
    }
    return PrismaRestaurantMapper.toDomain(restaurant)
  }

  async findAll(): Promise<Restaurant[]> {
    const restaurant = await prisma.restaurant.findMany({
      include: {
        OpeningHour: true,
        Product: true,
      },
    })
    return restaurant.map(PrismaRestaurantMapper.toDomain)
  }

  async delete(restaurantId: string): Promise<void> {
    await prisma.product.deleteMany({
      where: { restaurantId },
    })

    await prisma.openingHour.deleteMany({
      where: { restaurantId },
    })
    await prisma.restaurant.delete({
      where: { id: restaurantId },
    })
  }

  async update(restaurant: Restaurant): Promise<void> {
    await prisma.restaurant.update({
      where: { id: restaurant.id },
      data: PrismaRestaurantMapper.toPrisma(restaurant),
    })
  }
}
