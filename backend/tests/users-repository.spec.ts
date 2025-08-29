import {describe, expect, it} from 'vitest'
import { InMemoryUsersRepository } from 'infra/repositories/in-memory/InMemoryUsersRepository'

describe('UsersRepository', ()=>{
  it('Should be able to save an user in repository', async()=>{
    const repository = new InMemoryUsersRepository()
    const user = await repository.create({
      name: 'Antonio Alves',
      email:'antonio@teste.com',
      password:'12345678',
      avatarUrl:'./photos/avatar.png'
    })

    const found = await repository.findById(user.id)

    expect(found).toBeDefined()
    expect(found?.email).toBe('antonio@teste.com')
    expect(found?.avatarUrl).toBe('./photos/avatar.png')
  })
})