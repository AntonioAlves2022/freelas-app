import {it, describe, expect} from 'vitest'
import {User} from '../src/domain/entities/User'
describe('User entry', ()=>{
  it('Should be able to create a new user',()=>{
    const user = new User({
      name: 'Antonio Alves',
      email: 'antonio@teste.com',
      password: '123456'
    })
    expect(user.id).toBeDefined()
    expect(user.createdAt).toBeInstanceOf(Date)
    expect(user.email).toBe('antonio@teste.com')
  })

})