import  Fastify  from 'fastify'
import prismaPlugin from './plugins/prisma'
import usersRepositoryPlugin from './plugins/users-repository-plugin'
import { usersRoutes } from 'http/routes/usersRutes'

export async function builApp(){
  const app = Fastify({logger:true})
  
  app.get('/api', ()=>{
    return {message: 'Hi People'}
  })
  app.register(prismaPlugin)
  app.register(usersRepositoryPlugin)
  app.register(usersRoutes, {prefix:'/api'})
  return app
}