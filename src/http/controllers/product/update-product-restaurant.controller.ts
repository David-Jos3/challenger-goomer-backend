/* eslint-disable @stylistic/max-len */
import { FastifyReply, FastifyRequest } from 'fastify'
import { z, ZodError } from 'zod'
import { PrismaProductRepository } from '../../../database/prisma/repositories/prisma-product-repository'
import { UpdateProductRestaurantUseCase } from '../../../domain/use-cases/update-product-restaurant'

const updateProductRestaurantBodySchema = z.object({
  category: z.string().optional(),
  name: z.string().optional(),
  photoUrl: z.string().optional(),
  price: z.number().optional(),
  productId: z.string(),
})

export class UpdateProductRestaurantController {
  static async update(request:FastifyRequest, reply:FastifyReply): Promise<void> {
    try {
      const { category, name, photoUrl, price, productId } = updateProductRestaurantBodySchema.parse(request.body)

      const prismaProductRepository = new PrismaProductRepository()
      const updateProductRestaurantUseCase = new UpdateProductRestaurantUseCase(prismaProductRepository)

      await updateProductRestaurantUseCase.execute({
        category,
        name,
        photoUrl,
        price,
        productId,
      })
      return reply.status(204).send()
    } catch (err) {
      if (err instanceof ZodError) {
        return reply.status(400).send({ message: err.message })
      }
      return reply.status(500).send({ message: 'Internal Server Error' })
    }
  }
}
