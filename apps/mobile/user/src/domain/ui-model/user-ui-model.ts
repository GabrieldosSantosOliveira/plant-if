export interface UserUiModelProps {
  id: string
  lastName: string
  firstName: string
  email: string
  createdAt: string
  updatedAt: string
}
export class UserUiModel {
  constructor(private readonly props: UserUiModelProps) {}
  public copyWith(props: Partial<UserUiModelProps>) {
    return new UserUiModel({ ...this.props, ...props })
  }

  public get provider() {
    return this.props.provider
  }

  public set provider(provider: UserUiModelProvider) {
    this.props.provider = provider
  }

  public get id(): string {
    return this.props.id
  }

  public get lastName(): string {
    return this.props.lastName
  }

  public get firstName(): string {
    return this.props.firstName
  }

  public get email(): string {
    return this.props.email
  }

  public get createdAt(): Date {
    return new Date(this.props.createdAt)
  }

  public get updatedAt(): Date {
    return new Date(this.props.updatedAt)
  }
}
