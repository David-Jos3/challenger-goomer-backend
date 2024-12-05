import { randomUUID } from 'node:crypto'

interface ProductProps {
  name: string
  photoUrl: string
  price: number
  category: string
  promotionDescription: string
  promotionPrice: number
  restaurantId: string
  createdAt: Date
  updatedAt: Date | null
}

export class Product {
  public _id: string
  public _props: ProductProps

  constructor(props: ProductProps, id?: string) {
    this._id = id ?? randomUUID()
    this._props = { ...props }
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

  get promotionDescription(): string {
    return this._props.promotionDescription
  }

  set promotionDescription(promotionDescription: string) {
    this._props.promotionDescription = promotionDescription
  }

  get promotionPrice(): string {
    return this._props.promotionPrice.toFixed(2)
  }

  set promotionPrice(promotionPrice: number) {
    this._props.promotionPrice = promotionPrice
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

  get updatedAt(): Date | null {
    return this._props.updatedAt
  }
}
