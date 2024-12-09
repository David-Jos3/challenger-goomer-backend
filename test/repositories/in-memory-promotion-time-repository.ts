/* eslint-disable @stylistic/max-len */
import { PromotionTime } from '../../src/domain/entities/promotion-time'
import { PromotionTimeRepository } from '../../src/domain/repositories/promotion-time-repository'

export class InMemoryPromotionTimeRepository implements PromotionTimeRepository {
  promotionTimes: PromotionTime[] = []

  async create(promotionTime: PromotionTime): Promise<PromotionTime> {
    this.promotionTimes.push(promotionTime)
    return promotionTime
  }

  async findById(promotiontimeId: string): Promise<PromotionTime | null> {
    return this.promotionTimes.find((r) => r.id === promotiontimeId) ?? null
  }
}
