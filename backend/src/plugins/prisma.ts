import fp from 'fastify-plugin'
import { FastifyInstance } from 'fastify'
import { PrismaClient } from '@prisma/client'

export default fp(async(app)=>{
  const prisma = new PrismaClient()
  prisma.$connect()

  app.addHook('onClose',async()=>{
    await prisma.$disconnect()
  })
  app.decorate('prisma', prisma)
})

declare module 'fastify'{
  interface FastifyInstance{
    prisma:PrismaClient
  }
}