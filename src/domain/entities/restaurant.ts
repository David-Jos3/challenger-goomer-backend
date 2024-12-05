import { randomUUID } from 'node:crypto'

interface RestaurantProps {
  name: string
  address: string
  photoUrl: string
  createdAt: Date
  updatedAt?: Date | null
}

export class Restaurant {
  public _id: string
  public _props: RestaurantProps

  constructor(props: RestaurantProps, id?: string) {
    this._id = id ?? randomUUID()
    this._props = { ...props }
  }

  get id(): string {
    return this._id
  }

  get name(): string {
    return this._props.name
  }

  set name(name: string) {
    this._props.name = name
  }

  get address(): string {
    return this._props.address
  }

  set address(address: string) {
    this._props.address = address
  }

  get photoUrl(): string {
    return this._props.photoUrl
  }

  set photoUrl(photoUrl: string) {
    this._props.photoUrl = photoUrl
  }

  get createdAt(): Date {
    return this._props.createdAt
  }

  set createdAt(createdAt: Date) {
    this._props.createdAt = createdAt
  }
}
