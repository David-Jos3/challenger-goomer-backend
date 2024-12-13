import { OpeningHour as PrismaOpeningHour, Prisma } from '@prisma/client'
import { OpeningHour } from '../../../domain/entities/opening-hour'

export class PrismaOpeningHourMapper {
  static toDomain(raw: PrismaOpeningHour): OpeningHour {
    return new OpeningHour({
      dayOfWeek: raw.dayOfWeek,
      endTime: raw.endTime,
      startTime: raw.startTime,
      restaurantId: raw.restaurantId,
    }, raw.id.toString())
  }

  static toPrisma(row: OpeningHour): Prisma.OpeningHourUncheckedCreateInput {
    return {
      id: row.id,
      dayOfWeek: row.dayOfWeek,
      endTime: row.endTime,
      startTime: row.startTime,
      restaurantId: row.restaurantId,
    }
  }
}
