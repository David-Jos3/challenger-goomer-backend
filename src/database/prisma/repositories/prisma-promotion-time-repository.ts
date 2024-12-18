/* eslint-disable @stylistic/max-len */

import { PromotionTimeRepository } from '../../../domain/repositories/promotion-time-repository'
import { PromotionTime } from '../../../domain/entities/promotion-time'
import { PrismaPromotionTimeMapper } from '../mappers/promotion-time-mapper'
import { prisma } from '../../../lib/prisma-service'

export class PrismaPromotionTimeRepository implements PromotionTimeRepository {
  async create(promotionTime: PromotionTime): Promise<void> {
    const data = PrismaPromotionTimeMapper.toPrisma(promotionTime)
    await prisma.promotionTime.create({
      data,
    })
  }

  async findById(promotionTimeId: string): Promise<PromotionTime | null> {
    const promotionTime = await prisma.promotionTime.findUnique({
      where: { id: promotionTimeId },
      include: { product: true },
    })
    if (!promotionTime) {
      return null
    }
    return PrismaPromotionTimeMapper.toDomain(promotionTime)
  }
}
