/* eslint-disable @stylistic/max-len */
import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaRestaurantRepository } from '../../../database/prisma/repositories/prisma-restaurant-repository'
import { GetRestaurantsUseCase } from '../../../domain/use-cases/get-restaurants'
import { ZodError } from 'zod'

export class ListRestaurantController {
  static async findAll(request:FastifyRequest, reply:FastifyReply) {
    try {
      const restaurantRepository = new PrismaRestaurantRepository()
      const getRestaurantsUseCase = new GetRestaurantsUseCase(restaurantRepository)

      const restaurants = await getRestaurantsUseCase.execute()
      reply.status(200).send(restaurants)
    } catch (err) {
      if (err instanceof ZodError) {
        return reply.status(400).send({ message: err.message })
      }
      reply.status(500).send({ message: 'Internal Server Error' })
    }
  }
}
