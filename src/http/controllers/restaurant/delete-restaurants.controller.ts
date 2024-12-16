/* eslint-disable @stylistic/max-len */
import { z } from 'zod'
import { PrismaRestaurantRepository } from '../../../database/prisma/repositories/prisma-restaurant-repository'
import { DeleteRestaurantUseCase } from '../../../domain/use-cases/delete-restaurant'
import { FastifyReply, FastifyRequest } from 'fastify'

const deleteRestaurantBodySchema = z.object({
  restaurantId: z.string(),
})

export class DeleteRestaurantController {
  static async delete(request: FastifyRequest, reply: FastifyReply) :Promise<void> {
    try {
      const { restaurantId } = deleteRestaurantBodySchema.parse(request.body)

      const restaurantRepository = new PrismaRestaurantRepository()
      const deleteRestaurantUseCase = new DeleteRestaurantUseCase(restaurantRepository)

      await deleteRestaurantUseCase.execute({ restaurantId })
      reply.status(204).send()
    } catch (err) {
      if (err instanceof z.ZodError) {
        return reply.status(400).send({ message: err.message })
      }
      reply.status(500).send({ message: 'Internal Server Error' })
    }
  }
}