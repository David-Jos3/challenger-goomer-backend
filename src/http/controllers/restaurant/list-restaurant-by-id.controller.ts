/* eslint-disable @stylistic/max-len */
import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaRestaurantRepository } from '../../../database/prisma/repositories/prisma-restaurant-repository'
import { z, ZodError } from 'zod'
import { GetRestaurantByIdUseCase } from '../../../domain/use-cases/get-restaurant-by-id'

const listRestaurantByIdParamsSchema = z.object({
  id: z.string(),
})

export class ListRestaurantByIdController {
  static async findById(request:FastifyRequest, reply:FastifyReply) {
    try {
      const { id } = listRestaurantByIdParamsSchema.parse(request.params)

      const restaurantRepository = new PrismaRestaurantRepository()
      const getRestaurantByIdUseCase = new GetRestaurantByIdUseCase(restaurantRepository)

      const { restaurant } = await getRestaurantByIdUseCase.execute({ restaurantId: id })

      if (!restaurant) {
        return reply.status(404).send({ message: 'Restaurant not found' })
      }

      return reply.status(200).send({ restaurant })
    } catch (err) {
      if (err instanceof ZodError) {
        return reply.status(400).send({ message: err.message })
      }
      return reply.status(500).send({ message: 'Internal Server Error' })
    }
  }
}
