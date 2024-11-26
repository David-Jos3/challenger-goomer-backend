import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env/env'

export const app = fastify({
  logger: true,
})

app.get('/', async (req, res) => {
  res.send({ hello: 'world' })
})

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: error.message })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal Server Error' })
})
