import type { CreateUserDTO } from 'domain/dtos/CreateUserDTO'
import type { User } from 'domain/entities/User'

export interface IUsersRepository{
  create(data:CreateUserDTO):Promise<User>
  findById(id:string):Promise<User|null>
  findByEmail(email:string):Promise<User|null>
  findAll():Promise<User[]>
  update(id:string, data:Partial<CreateUserDTO>):Promise<User|null>
  delete(id:string):Promise<void>
}