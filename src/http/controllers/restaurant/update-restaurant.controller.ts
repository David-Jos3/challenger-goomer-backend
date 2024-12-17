/* eslint-disable @stylistic/max-len */
import { FastifyReply, FastifyRequest } from 'fastify'
import { z, ZodError } from 'zod'
import { PrismaRestaurantRepository } from '../../../database/prisma/repositories/prisma-restaurant-repository'
import { UpdateRestaurantUseCase } from '../../../domain/use-cases/update-restaurant'

const updateRestaurantBodySchema = z.object({
  restaurantId: z.string(),
  name: z.string().optional(),
  address: z.string().optional(),
  photoUrl: z.string().optional(),
})

export class UpdateRestaurantController {
  static async update(request:FastifyRequest, reply:FastifyReply): Promise<void> {
    try {
      const { restaurantId, address, name, photoUrl } = updateRestaurantBodySchema.parse(request.body)

      const prismaRestaurantRepository = new PrismaRestaurantRepository()
      const updateRestaurantUseCase = new UpdateRestaurantUseCase(prismaRestaurantRepository)

      await updateRestaurantUseCase.execute({
        address,
        name,
        photoUrl,
        restaurantId,
        updatedAt: new Date(),
      })
      return reply.status(204).send()
    } catch (err) {
      if (err instanceof ZodError) {
        return reply.status(400).send({ message: err.message })
      }

      if (err instanceof Error) {
        return reply.status(400).send({ message: err.message })
      }
      return reply.status(500).send({ message: 'Internal Server Error' })
    }
  }
}
