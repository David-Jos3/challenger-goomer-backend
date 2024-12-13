import { PromotionTime } from '../../domain/entities/promotion-time'

export interface PromotionTimeRepository {
  create(promotionTime: PromotionTime) : Promise<void>
  findById(promotionTimeId: string) : Promise<PromotionTime | null>
}
