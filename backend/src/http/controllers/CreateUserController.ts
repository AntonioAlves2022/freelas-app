import {FastifyRequest, FastifyReply} from 'fastify'
import {z} from 'zod'
import { CreateUserUsecase } from 'domain/usecases/users/CreateUserUsecase'
import { createUserSchema, type CreateUserDTO } from 'domain/dtos/CreateUserDTO'
import { type CreateUserRequest } from 'types'

function isZodError(error:unknown):error is z.ZodError{
  return error instanceof z.ZodError
}

export class CreateUserController{
  constructor(private userUsecase:CreateUserUsecase){}
  async handle(request:CreateUserRequest, reply:FastifyReply):Promise<FastifyReply>{
    try{
      const userData:CreateUserDTO = createUserSchema.parse(request.body)
      const user = this.userUsecase.execute(userData)
      return reply.status(201).send(user)
    }catch(error){
      if(isZodError(error)){
        return reply.status(400).send({error:'Invalid data',
          detail: error.issues
        })
      }

      if(error instanceof Error && error.message === 'E-mail already exists'){
        return reply.status(409).send({error: error.message})
      }
      console.error('Internal server error:', error)
      return reply.status(500).send({error: 'Internal server error'})
      
    }
  }
}