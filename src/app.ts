/* eslint-disable @stylistic/max-len */
import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env/env'
import { RestaurantRouter } from './http/controllers/restaurant/router'
import { ProductRestaurantRouter } from './http/controllers/product/router.'
import { OpeningHourRouter } from './http/controllers/create-opening-hour/router'
import { PromotionTimeRouter } from './http/controllers/promotion/router'

export const app = fastify({
  logger: true,
})
app.register(RestaurantRouter.routes)
app.register(ProductRestaurantRouter.routes)
app.register(OpeningHourRouter.routes)
app.register(PromotionTimeRouter.routes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: error.message })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal Server Error' })
})
