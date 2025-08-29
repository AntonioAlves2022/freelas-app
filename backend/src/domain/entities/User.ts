export interface UserProps{
  id?: string
  name: string
  email: string
  password: string
  avatarUrl?: string | null
  createdAt?: Date
}

export class User{
  private props:UserProps
  constructor(props:UserProps){
    this.props = {
      ...props,
      id: props.id ?? crypto.randomUUID(),
      createdAt: props.createdAt ?? new Date()
    }
  }

  // GETTERS
  get id(){return this.props.id!}
  get name(){return this.props.name}
  get email(){return this.props.email}
  get password(){return this.props.password}
  get avatarUrl(){return this.props.avatarUrl}
  get createdAt(){return this.props.createdAt}
}