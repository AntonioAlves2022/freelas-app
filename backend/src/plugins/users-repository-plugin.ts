import fp from 'fastify-plugin'
import { PrismaClient } from '@prisma/client'
import { PrismaUsersRepository } from 'infra/repositories/prisma/PrismaUsersRepository'
import { CreateUserUsecase } from 'domain/usecases/users/CreateUserUsecase'
import { CreateUserController } from 'http/controllers/CreateUserController'
import { ListUsersUsecase } from 'domain/usecases/users/ListUsersUsecase'
import { ListUsersController } from 'http/controllers/ListUsersController'

export default fp(async (app)=>{
  const usersRepository = new PrismaUsersRepository(app.prisma)
  const createUserUsecase = new CreateUserUsecase(usersRepository)
  const createUserController = new CreateUserController(createUserUsecase)
  const listUsersUsecase = new ListUsersUsecase(usersRepository)
  const listUsersController = new ListUsersController(listUsersUsecase)

  app.decorate('users', {
    repository:usersRepository,
    usecases:{
       create:createUserUsecase,
       list: listUsersUsecase
    },
    controllers:{
      create: createUserController,
      list: listUsersController
    }
   
    
  })
})
declare module 'fastify'{
  interface FastifyInstance{
    users:{
      repository: PrismaUsersRepository,
      usecases:{
        create:CreateUserUsecase,
        list:ListUsersUsecase
      }
      controllers:{
        create: CreateUserController,
        list: ListUsersController
      }
    }
  }
}