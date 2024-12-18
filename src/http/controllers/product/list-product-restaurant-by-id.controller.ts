/* eslint-disable @stylistic/max-len */
import { FastifyReply, FastifyRequest } from 'fastify'
import { z, ZodError } from 'zod'
import { PrismaProductRepository } from '../../../database/prisma/repositories/prisma-product-repository'
import { GetProductRestaurantByIdUseCase } from '../../../domain/use-cases/get-product-restaurant-by-id'

const listProductRestaurantByIdParamsSchema = z.object({
  id: z.string(),
})

export class ListProductRestaurantByIdController {
  static async findById(request:FastifyRequest, reply:FastifyReply) {
    try {
      const { id } = listProductRestaurantByIdParamsSchema.parse(request.params)

      const productRepository = new PrismaProductRepository()
      const getRestaurantByIdUseCase = new GetProductRestaurantByIdUseCase(productRepository)

      const { product } = await getRestaurantByIdUseCase.execute({ productId: id })

      if (!product) {
        return reply.status(404).send({ message: 'Restaurant not found' })
      }

      return reply.status(200).send({ product })
    } catch (err) {
      if (err instanceof ZodError) {
        return reply.status(400).send({ message: err.message })
      }
      return reply.status(500).send({ message: 'Internal Server Error' })
    }
  }
}
