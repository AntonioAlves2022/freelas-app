import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from 'infra/repositories/in-memory/InMemoryUsersRepository'
import { CreateUserUsecase } from 'domain/usecases/users/CreateUserUsecase'
import { compare, hash } from 'utils/hash'

let repo:InMemoryUsersRepository
let usecase:CreateUserUsecase
describe('Create User usecase',()=>{

  beforeEach(()=>{
    repo = new InMemoryUsersRepository()
    usecase = new CreateUserUsecase(repo)
  })

  it('Should be able to create a hashed password', async()=>{
    const user = await usecase.execute({
      name: 'Antonio',
      email: 'antonio@teste.com',
      password: '123456',
      avatarUrl: './fotos/avatar.png'
    })
    expect(user.id).toBeDefined()
    expect(user.name).toBe('Antonio')
    expect(user.email).toBe('antonio@teste.com')
    expect(user.password).not.toBe('123456')
    expect(await compare('123456', user.password)).toBe(true)
  })

  it('Should not be able to create a new user with an existent e-mail', async()=>{
    await usecase.execute({
      name: 'Antonio',
      email: 'antonio@teste.com',
      password: '123456',
      avatarUrl: './fotos/avatar.png'
    })
    await expect(usecase.execute({
      name: 'Outro usuario',
      email: 'antonio@teste.com',
      password: '123456',
      avatarUrl: './fotos/avatar.png'
    })).rejects.toThrow('E-mail already exists')
  })

  it('Should be able to validate data with zod', async()=>{
    await expect(usecase.execute({
       name: 'Je', // Nome curto
      email: 'wrong-email', // email com formato incorreto
      password: '123', //senha curta
      avatarUrl: './fotos/avatar.png'
    })).rejects.toThrow()
  })
})
