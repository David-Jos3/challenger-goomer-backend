/* eslint-disable @stylistic/max-len */
import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaProductRepository } from '../../../database/prisma/repositories/prisma-product-repository'
import { DeleteProductRestaurantUseCase } from '../../../domain/use-cases/delete-product-restaurant'

const deleteProductRestaurantParamsSchema = z.object({
  id: z.string(),
})

export class DeleteProductRestaurantController {
  static async delete(request: FastifyRequest, reply: FastifyReply) :Promise<void> {
    try {
      const { id } = deleteProductRestaurantParamsSchema.parse(request.params)

      const productRepository = new PrismaProductRepository()
      const deleteProductRestaurantUseCase = new DeleteProductRestaurantUseCase(productRepository)

      await deleteProductRestaurantUseCase.execute({ productId: id })
      reply.status(204).send()
    } catch (err) {
      if (err instanceof z.ZodError) {
        return reply.status(400).send({ message: err.message })
      }
      reply.status(500).send({ message: 'Internal Server Error' })
    }
  }
}
