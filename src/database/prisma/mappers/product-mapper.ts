import { Decimal } from '@prisma/client/runtime/library'
import { Product } from '../../../domain/entities/product'
// eslint-disable-next-line @stylistic/max-len
import { Product as PrismaProduct, Prisma, PromotionTime as PrismaPromotionTime } from '@prisma/client'

type PrismaProductWithRelations = PrismaProduct & {
  promotionSchedules: PrismaPromotionTime[];
}

export class PrismaProductMapper {
  static toDomain(raw: PrismaProductWithRelations): Product {
    return new Product({
      name: raw.name,
      photoUrl: raw.photoUrl,
      price: raw.price.toNumber(),
      category: raw.category,
      restaurantId: raw.restaurantId,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      promotionTime: raw.promotionSchedules.map(promotionTimes => ({
        dayOfWeek: promotionTimes.dayOfWeek,
        description: promotionTimes.description,
        startTime: promotionTimes.startTime,
        endTime: promotionTimes.endTime,
        price: promotionTimes.price.toNumber(),
        productId: promotionTimes.productId,

      })),
    }, raw.id.toString())
  }

  static toPrisma(row: Product): Prisma.ProductUncheckedCreateInput {
    return {
      id: row.id,
      name: row.name,
      photoUrl: row.photoUrl,
      price: new Decimal(row.price),
      category: row.category,
      restaurantId: row.restaurantId,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    }
  }
}
