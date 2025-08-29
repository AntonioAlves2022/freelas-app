import { IUsersRepository } from 'infra/database/IUsersRepository'
import {User} from '../../../domain/entities/User'
import { CreateUserDTO } from 'domain/dtos/CreateUserDTO'

export class InMemoryUsersRepository implements IUsersRepository{
  private users:User[] = []

  async create(data: CreateUserDTO): Promise<User> {
    const user = new User({...data})
    this.users.push(user)
    return user
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find(u=> u.id === id) ?? null
  }
  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(u=>u.email === email) ?? null
  }
  async findAll(): Promise<User[]> {
    return this.users
  }
  async update(id: string, data: Partial<CreateUserDTO>): Promise<User | null> {
    const userIndex = this.users.findIndex(u=> u.id === id)
    if (userIndex === -1) return null
    const oldUser = this.users[userIndex]
    const updatedUser = new User({
      id:oldUser.id,
      name: data.name ?? oldUser.name,
      email: data.email ?? oldUser.email,
      password: data.password ?? oldUser.password,
      avatarUrl: data.avatarUrl ?? oldUser.avatarUrl,
      createdAt: oldUser.createdAt
    })
    this.users[userIndex] = updatedUser
    return updatedUser
  }
  async delete(id: string): Promise<void> {
    this.users.filter(u=> u.id !== id)
  }
  
}