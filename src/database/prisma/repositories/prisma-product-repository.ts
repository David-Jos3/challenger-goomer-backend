/* eslint-disable @stylistic/max-len */
import { ProductRepository } from '../../../domain/repositories/product-repository'
import { Product } from '../../../domain/entities/product'
import { PrismaProductMapper } from '../mappers/product-mapper'
import { prisma } from '../../../lib/prisma-service'

export class PrismaProductRepository implements ProductRepository {
  async create(product: Product): Promise<void> {
    const data = PrismaProductMapper.toPrisma(product)
    await prisma.product.create({
      data,
    })
  }

  async findById(productId: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    })

    if (!product) {
      return null
    }
    return PrismaProductMapper.toDomain(product)
  }

  async findAll(): Promise<Product[]> {
    const product = await prisma.product.findMany({
      include: { restaurant: true },
    })
    return product.map(PrismaProductMapper.toDomain)
  }

  async delete(productId: string): Promise<void> {
    prisma.product.delete({ where: { id: productId } })
  }

  async update(product: Product): Promise<void> {
    prisma.product.update({
      where: { id: product.id },
      data: PrismaProductMapper.toPrisma(product),
    })
  }
}
