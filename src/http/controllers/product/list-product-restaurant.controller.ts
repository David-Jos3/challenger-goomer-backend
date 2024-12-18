/* eslint-disable @stylistic/max-len */
import { FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'
import { PrismaProductRepository } from '../../../database/prisma/repositories/prisma-product-repository'
import { GetProductRestaurantsUseCase } from '../../../domain/use-cases/get-products-restaurants'

export class ListProductRestaurantController {
  static async findAll(request:FastifyRequest, reply:FastifyReply) {
    try {
      const productRepository = new PrismaProductRepository()
      const getProductRestaurantsUseCase = new GetProductRestaurantsUseCase(productRepository)

      const { products } = await getProductRestaurantsUseCase.execute()
      reply.status(200).send(products)
    } catch (err) {
      if (err instanceof ZodError) {
        return reply.status(400).send({ message: err.message })
      }
      reply.status(500).send({ message: 'Internal Server Error' })
    }
  }
}
