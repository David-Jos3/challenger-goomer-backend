import { randomUUID } from 'node:crypto'
import { PromotionTimeProps } from './promotion-time'

export interface ProductProps {
  name: string
  photoUrl: string
  price: number
  category: string
  restaurantId: string
  createdAt: Date
  promotionTime: PromotionTimeProps[]
  updatedAt?: Date | null
}

export class Product {
  private readonly _id: string
  private _props: ProductProps

  constructor(props: ProductProps, id?: string) {
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

  get photoUrl() {
    return this._props.photoUrl
  }

  set photoUrl(photoUrl: string) {
    this._props.photoUrl = photoUrl
  }

  get price() {
    return this._props.price
  }

  set price(price: number) {
    this._props.price = price
  }

  get category() {
    return this._props.category
  }

  set category(category: string) {
    this._props.category = category
  }

  get restaurantId() {
    return this._props.restaurantId
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

  get promotionTime() {
    return this._props.promotionTime
  }
}
