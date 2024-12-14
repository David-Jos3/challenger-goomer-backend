/* eslint-disable @stylistic/max-len */
import { FastifyReply, FastifyRequest } from 'fastify'
import { RegisterRestaurantUseCase } from '../../../domain/use-cases/register-restaurants'
import { z, ZodError } from 'zod'
import { PrismaRestaurantRepository } from '../../../database/prisma/repositories/prisma-restaurant-repository'

const RegisterRestaurantBodySchema = z.object({
  name: z.string(),
  address: z.string(),
  photoUrl: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export class RegisterRestaurantController {
  static async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, address, photoUrl, createdAt } = RegisterRestaurantBodySchema.parse(request.body)

      const restaurantRepository = new PrismaRestaurantRepository()
      const registerRestaurantUseCase = new RegisterRestaurantUseCase(restaurantRepository)

      await registerRestaurantUseCase.execute({ name, address, photoUrl, createdAt })
      reply.status(201).send({ message: 'Data sent successfully' })
    } catch (err) {
      if (err instanceof ZodError) {
        return reply.status(400).send({ message: err.message })
      }
      reply.status(500).send({ message: 'Internal Server Error' })
    }
  }
}
