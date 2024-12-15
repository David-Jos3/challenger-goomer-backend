/* eslint-disable @stylistic/max-len */
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaOpeningHourRepository } from '../../../database/prisma/repositories/prisma-opening-hour.repository'
import { CreateOpeningHourUseCase } from '../../../domain/use-cases/create-opening-hour'

const createOpeningHourBodySchema = z.object({
  dayOfWeek: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  restaurantId: z.string(),
})

export class CreateOpeningHourController {
  static async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { dayOfWeek, endTime, restaurantId, startTime } = createOpeningHourBodySchema.parse(request.body)

      const openingHourRepository = new PrismaOpeningHourRepository()
      const createOpeningHourUseCase = new CreateOpeningHourUseCase(openingHourRepository)

      await createOpeningHourUseCase.execute({
        dayOfWeek,
        endTime,
        restaurantId,
        startTime,
      })
    } catch (err) {
      if (err instanceof z.ZodError) {
        return reply.status(400).send({ message: err.message })
      }
      reply.status(500).send({ message: 'Internal Server Error' })
    }
  }
}
