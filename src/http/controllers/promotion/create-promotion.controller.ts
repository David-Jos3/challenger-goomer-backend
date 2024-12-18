/* eslint-disable @stylistic/max-len */
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaPromotionTimeRepository } from '../../../database/prisma/repositories/prisma-promotion-time-repository'
import { CreatePromotionTimeUseCase } from '../../../domain/use-cases/create-promotion-time'

const createPromotionTime = z.object({
  dayOfWeek: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  price: z.number(),
  description: z.string(),
  productId: z.string(),
})

export class CreatePromotionTimeController {
  static async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { dayOfWeek, description, price, productId, startTime, endTime } = createPromotionTime.parse(request.body)

      const promotionTimeRepository = new PrismaPromotionTimeRepository()
      const createPromotionTimeUseCase = new CreatePromotionTimeUseCase(promotionTimeRepository)
      await createPromotionTimeUseCase.execute({
        dayOfWeek,
        description,
        endTime,
        productId,
        price,
        startTime,
      })
      reply.status(201).send({ message: 'Promotion Time created successfully' })
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.log(z.ZodError.toString)
        return reply.status(400).send({ message: err.message })
      }
      reply.status(500).send({ message: 'Internal Server Error' })
    }
  }
}
