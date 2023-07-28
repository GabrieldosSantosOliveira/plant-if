import { Replace } from '../helpers/replace'
export interface UserProps {
  id: string
  email: string
  firstName: string
  lastName: string
  image?: string
  password?: string
  resetPasswordExpires?: Date
  resetPasswordToken?: string
  createdAt: Date
  updatedAt: Date
}
export class User {
  private props: UserProps
  constructor({
    createdAt,
    updatedAt,
    ...props
  }: Replace<UserProps, { createdAt?: Date; updatedAt?: Date }>) {
    this.props = {
      createdAt: createdAt || new Date(),
      updatedAt: updatedAt || new Date(),
      ...props,
    }
  }

  public get password() {
    return this.props.password
  }

  public set password(password: string | undefined) {
    this.props.password = password
  }

  public get resetPasswordExpires() {
    return this.props.resetPasswordExpires
  }

  public set resetPasswordExpires(resetPasswordExpires: Date | undefined) {
    this.props.resetPasswordExpires = resetPasswordExpires
  }

  public get resetPasswordToken() {
    return this.props.resetPasswordToken
  }

  public set resetPasswordToken(resetPasswordToken: string | undefined) {
    this.props.resetPasswordToken = resetPasswordToken
  }

  public get id() {
    return this.props.id
  }

  public get email() {
    return this.props.email
  }

  public set email(email: string) {
    this.props.email = email
  }

  public get firstName() {
    return this.props.firstName
  }

  public set firstName(firstName: string) {
    this.props.firstName = firstName
  }

  public get lastName() {
    return this.props.lastName
  }

  public set lastName(lastName: string) {
    this.props.lastName = lastName
  }

  public get image() {
    return this.props.image
  }

  public set image(image: string | undefined) {
    this.props.image = image
  }

  public get createdAt() {
    return this.props.createdAt
  }

  public get updatedAt() {
    return this.props.updatedAt
  }

  public set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt
  }
}
