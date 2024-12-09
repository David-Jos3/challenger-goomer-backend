import { randomUUID } from 'node:crypto'

interface ProductProps {
  name: string
  photoUrl: string
  price: number
  category: string
  restaurantId: string
  createdAt: Date
  updatedAt?: Date | null
}

export class Product {
  private readonly _id: string
  private _props: ProductProps

  constructor(props: ProductProps, id?: string) {
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

  get photoUrl(): string {
    return this._props.photoUrl
  }

  set photoUrl(photoUrl: string) {
    this._props.photoUrl = photoUrl
  }

  get price(): string {
    return this._props.price.toFixed(2)
  }

  set price(price: number) {
    this._props.price = price
  }

  get category(): string {
    return this._props.category
  }

  set category(category: string) {
    this._props.category = category
  }

  get restaurantId(): string {
    return this._props.restaurantId
  }

  get createdAt(): Date {
    return this._props.createdAt
  }

  set createdAt(createdAt: Date) {
    this._props.createdAt = createdAt
  }
}
