import { Decimal } from '@prisma/client/runtime/library'
import { Product } from '../../../domain/entities/product'
import { Product as PrismaProduct, Prisma } from '@prisma/client'
export class PrismaProductMapper {
  static toDomain(raw: PrismaProduct): Product {
    return new Product({
      name: raw.name,
      photoUrl: raw.photoUrl,
      price: raw.price.toNumber(),
      category: raw.category,
      restaurantId: raw.restaurantId,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
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
