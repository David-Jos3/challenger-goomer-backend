import { randomUUID } from 'node:crypto'

interface PromotionTimeProps {
  dayOfWeek: string
  startTime: string
  endTime: string
  price: number
  description: string
  productId: string
}

export class PromotionTime {
  private readonly _id: string
  private _props: PromotionTimeProps

  constructor(props: PromotionTimeProps, id?: string) {
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

  get price(): number {
    return this._props.price
  }

  set price(price: number) {
    this._props.price = price
  }

  get description(): string {
    return this._props.description
  }

  set description(description: string) {
    this._props.description = description
  }

  get productId(): string {
    return this._props.productId
  }
}
