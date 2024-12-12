/* eslint-disable @stylistic/max-len */
import { Restaurant } from '../../../domain/entities/restaurant'
import { RestaurantRepository } from '../../../domain/repositories/restaurant-repository.'
import { PrismaClient } from '@prisma/client'
import { PrismaRestaurantMapper } from '../mappers/restaurant-mapper'

export class PrismaRestaurantRepository implements RestaurantRepository {
  constructor(private prisma: PrismaClient) {}
  async create(restaurant: Restaurant): Promise<void> {
    const data = PrismaRestaurantMapper.toPrisma(restaurant)
    await this.prisma.restaurant.create({
      data,
    })
  }

  async findByName(name: string): Promise<Restaurant | null> {
    const restaurant = await this.prisma.restaurant.findFirst({
      where: { name },
    })

    if (!restaurant) {
      return null
    }
    return PrismaRestaurantMapper.toDomain(restaurant)
  }

  async findByAddress(address: string): Promise<Restaurant | null> {
    const restaurant = await this.prisma.restaurant.findFirst({
      where: { address },
    })

    if (!restaurant) {
      return null
    }
    return PrismaRestaurantMapper.toDomain(restaurant)
  }

  async findById(restaurantId: string): Promise<Restaurant | null> {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id: restaurantId },
    })

    if (!restaurant) {
      return null
    }
    return PrismaRestaurantMapper.toDomain(restaurant)
  }

  async findAll(): Promise<Restaurant[]> {
    const restaurant = await this.prisma.restaurant.findMany({
      include: { Product: true },
    })
    return restaurant.map(PrismaRestaurantMapper.toDomain)
  }

  async delete(restaurantId: string): Promise<void> {
    await this.prisma.restaurant.findFirst({ where: { id: restaurantId } })
  }

  async update(restaurant: Restaurant): Promise<void> {
    await this.prisma.restaurant.update({
      where: { id: restaurant.id },
      data: PrismaRestaurantMapper.toPrisma(restaurant),
    })
  }
}