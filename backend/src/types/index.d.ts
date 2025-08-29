import {FastifyRequest} from 'fastify'
import { CreateUserDTO } from 'domain/dtos/CreateUserDTO'

declare module 'fastify'{
  interface FastifyRequest{
    body:CreateUserDTO
  }
}

export interface CreateUserRequest extends FastifyRequest{}
