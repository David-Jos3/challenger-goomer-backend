/* eslint-disable @stylistic/max-len */
import { z } from 'zod'
import { PrismaProductRepository } from '../../../database/prisma/repositories/prisma-product-repository'
import { RegisterProductRestaurantUseCase } from '../../../domain/use-cases/register-product-restaurant'
import { FastifyReply, FastifyRequest } from 'fastify'

const registerProductRestaurantsBodySchema = z.object({
  name: z.string(),
  photoUrl: z.string(),
  price: z.number(),
  restaurantId: z.string(),
  category: z.string(),
  createdAt: z.date().optional(),
})

export class RegisterProductRestaurantsController {
  static async create(request:FastifyRequest, reply:FastifyReply) {
    try {
      const { name, photoUrl, price, restaurantId, category, createdAt } = registerProductRestaurantsBodySchema.parse(request.body)

      const productRepository = new PrismaProductRepository()
      const registerProductRestaurantUseCase = new RegisterProductRestaurantUseCase(productRepository)

      await registerProductRestaurantUseCase.execute({
        name,
        photoUrl,
        price,
        restaurantId,
        category,
        createdAt,
      })
      reply.status(201).send({ message: 'Data sent successfully' })
    } catch (err) {
      if (err instanceof z.ZodError) {
        return reply.status(400).send({ message: err.message })
      }
      reply.status(500).send({ message: 'Internal Server Error' })
    }
  }
}
