import { ListUsersUsecase } from 'domain/usecases/users/ListUsersUsecase'
import { FastifyReply, FastifyRequest } from 'fastify'
export class ListUsersController{
  constructor(private usecase:ListUsersUsecase){}
  async handle(req:FastifyRequest, reply:FastifyReply){
    try{
      const users = await this.usecase.execute()
      return reply.status(200).send({users})
    }catch(error){
      console.error(error)
      return reply.status(500).send({error:'Internal server error'})
    }
  }
}