import { randomUUID } from 'node:crypto'

interface OpeningHourProps {
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  restaurantId: string;
}

export class OpeningHour {
  private readonly _id: string
  private _props: OpeningHourProps

  constructor(props: OpeningHourProps, id?: string) {
    this._id = id ?? randomUUID()
    this._props = { ...props }
  }

  get id(): string {
    return this._id
  }

  get dayOfWeek(): string {
    return this._props.dayOfWeek
  }

  set dayOfWeek(dayOfWeek: string) {
    this._props.dayOfWeek = dayOfWeek
  }

  get startTime(): string {
    return this._props.startTime
  }

  set startTime(startTime: string) {
    this._props.startTime = startTime
  }

  get endTime(): string {
    return this._props.endTime
  }

  set endTime(endTime: string) {
    this._props.endTime = endTime
  }

  get restaurantId(): string {
    return this._props.restaurantId
  }
}
