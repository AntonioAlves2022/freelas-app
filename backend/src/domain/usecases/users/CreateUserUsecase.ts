import {hash} from '../../../utils/hash'
import { IUsersRepository } from 'infra/database/IUsersRepository'
import { User } from 'domain/entities/User'
import { CreateUserDTO, createUserSchema } from 'domain/dtos/CreateUserDTO'
import { parse } from 'path'

// Usecase: Arquivo que possui as regras de negócio
export class CreateUserUsecase{
  constructor(private usersRepository:IUsersRepository){}
  async execute(data:CreateUserDTO){
    // 1. Validação dos dados
    const parsedUser = createUserSchema.parse(data)
    
    // 2. Verificar se o e-mail já está cadastrado
    const emailAlreadyExists = await this.usersRepository.findByEmail(parsedUser.email)
    
    if(emailAlreadyExists){
      throw new Error('E-mail already exists')
    }
    // 3. Gera o hash da senha (criptografia)
    const hashedPassword = await hash(parsedUser.password)
    // 4. Salva o usuario
    const user = await this.usersRepository.create({
      ...parsedUser,
      password: hashedPassword
    })
    return user

  }
}