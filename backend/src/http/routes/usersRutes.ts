import {FastifyInstance, FastifyRequest} from 'fastify'
import { createUserSchema, CreateUserDTO } from 'domain/dtos/CreateUserDTO'
import { CreateUserRequest } from 'types'
import { CreateUserController } from 'http/controllers/CreateUserController'
import { ListUsersController } from 'http/controllers/ListUsersController'

export async function usersRoutes(app:FastifyInstance){
  const usersController = new CreateUserController(app.users.usecases.create)
  app.post('/users', async (req:FastifyRequest<{Body:CreateUserDTO}>, reply)=> app.users.controllers.create.handle(req as CreateUserRequest, reply))

  const listController = new ListUsersController(app.users.usecases.list)
  app.get('/users', async(req,reply)=>app.users.controllers.list.handle(req, reply))
}