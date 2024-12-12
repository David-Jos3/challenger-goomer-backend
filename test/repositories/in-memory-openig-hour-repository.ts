/* eslint-disable @stylistic/max-len */
import { OpeningHour } from '../../src/domain/entities/opening-hour'
import { OpeningHourRepository } from '../../src/domain/repositories/opening-hour-repository'

export class InMemoryOpeningHourRepository implements OpeningHourRepository {
  openingHours: OpeningHour[] = []

  async create(openingHour: OpeningHour): Promise<void> {
    this.openingHours.push(openingHour)
  }

  async findById(openinghourId: string): Promise<OpeningHour | null> {
    return this.openingHours.find((r) => r.id === openinghourId) ?? null
  }
}
