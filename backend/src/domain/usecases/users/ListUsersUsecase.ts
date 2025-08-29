import { IUsersRepository } from 'infra/database/IUsersRepository'
import { User } from 'domain/entities/User'

export class ListUsersUsecase{
  constructor(private usersRepository:IUsersRepository){}
  async execute():Promise<User[]>{
    return this.usersRepository.findAll()
  }
}