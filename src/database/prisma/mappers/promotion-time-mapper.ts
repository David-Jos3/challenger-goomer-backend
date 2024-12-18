/* eslint-disable @stylistic/max-len */
import { PromotionTime as PrismaPromotionTime, Prisma } from '@prisma/client'
import { PromotionTime } from '../../../domain/entities/promotion-time'
import { Decimal } from '@prisma/client/runtime/library'
export class PrismaPromotionTimeMapper {
  static toDomain(raw: PrismaPromotionTime): PromotionTime {
    return new PromotionTime({
      dayOfWeek: raw.dayOfWeek,
      description: raw.description,
      startTime: raw.startTime,
      endTime: raw.endTime,
      price: raw.price.toNumber(),
      productId: raw.productId,
    }, raw.id.toString())
  }

  static toPrisma(row: PromotionTime): Prisma.PromotionTimeUncheckedCreateInput {
    return {
      id: row.id,
      dayOfWeek: row.dayOfWeek,
      description: row.description,
      startTime: row.startTime,
      endTime: row.endTime,
      price: new Decimal(row.price),
      productId: row.productId,
    }
  }
}
