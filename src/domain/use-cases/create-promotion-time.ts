/* eslint-disable @stylistic/max-len */
import { PromotionTime } from '../entities/promotion-time'
import { PromotionTimeRepository } from '../repositories/promotion-time-repository'
import { validateTime } from '../utils/validate-time'
import { InvalidPriceException } from './errors/invalid-price-exception'

interface PromotionTimeUseCaseRequest {
  dayOfWeek: string
  startTime: string
  endTime: string
  price: number
  description: string
  productId: string
}

interface PromotionTimeUseCaseResponse {
  promotionTime: PromotionTime
}

export class CreatePromotionTimeUseCase {
  constructor(private promotionTimeRepository: PromotionTimeRepository) {}

  async execute({
    dayOfWeek,
    startTime,
    endTime,
    price,
    description,
    productId,
  }: PromotionTimeUseCaseRequest):Promise<PromotionTimeUseCaseResponse> {
    await validateTime(startTime, endTime)

    if (price <= 0) throw new InvalidPriceException()

    const promotionTime = new PromotionTime({
      dayOfWeek,
      startTime,
      endTime,
      price,
      description,
      productId,
    })
    await this.promotionTimeRepository.create(promotionTime)

    return { promotionTime }
  }
}
