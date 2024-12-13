/* eslint-disable @stylistic/max-len */
import { OpeningHourRepository } from '../../../domain/repositories/opening-hour-repository'
import { OpeningHour } from '../../../domain/entities/opening-hour'
import { PrismaOpeningHourMapper } from '../mappers/opening-hour-mapper'
import { prisma } from '../../../lib/prisma-service'

export class PrismaOpeningHourRepository implements OpeningHourRepository {
  async create(openingHour: OpeningHour): Promise<void> {
    const data = PrismaOpeningHourMapper.toPrisma(openingHour)
    await prisma.openingHour.create({
      data,
    })
  }

  async findById(openingHourId: string): Promise<OpeningHour | null> {
    const openingHour = await prisma.openingHour.findUnique({
      where: { id: openingHourId },
    })

    if (!openingHour) {
      return null
    }
    return PrismaOpeningHourMapper.toDomain(openingHour)
  }
}
