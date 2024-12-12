import { OpeningHour } from '../../domain/entities/opening-hour'

export interface OpeningHourRepository {
  create(openingHour: OpeningHour): Promise<void>
  findById(openingHourId: string): Promise<OpeningHour | null>
}
