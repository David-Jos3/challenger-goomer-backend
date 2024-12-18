import { randomUUID } from 'node:crypto'
import { ProductProps } from './product'
import { OpeningHourProps } from './opening-hour'

interface RestaurantProps {
  name: string
  address: string
  photoUrl: string
  createdAt: Date
  updatedAt?: Date | null
  product: ProductProps[]
  openingHours: OpeningHourProps[]
}

export class Restaurant {
  private readonly _id: string
  private _props: RestaurantProps

  constructor(props: RestaurantProps, id?: string) {
    this._id = id ?? randomUUID()
    this._props = { ...props }
  }

  get id() {
    return this._id
  }

  get name() {
    return this._props.name
  }

  set name(name: string) {
    this._props.name = name
  }

  get address() {
    return this._props.address
  }

  set address(address: string) {
    this._props.address = address
  }

  get photoUrl() {
    return this._props.photoUrl
  }

  set photoUrl(photoUrl: string) {
    this._props.photoUrl = photoUrl
  }

  get createdAt() {
    return this._props.createdAt
  }

  set createdAt(createdAt: Date) {
    this._props.createdAt = createdAt
  }

  get updatedAt() {
    return this._props.updatedAt
  }

  set updatedAt(updatedAt: Date | null | undefined) {
    this._props.updatedAt = updatedAt ?? new Date()
  }

  get products() {
    return this._props.product
  }

  get openingHours() {
    return this._props.openingHours
  }
}
