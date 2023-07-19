import { randomUUID } from 'node:crypto'

import { Replace } from '../helpers/replace'
export interface UserProps {
  id: string
  email: string
  firstName: string
  lastName: string
  image?: string
  createdAt: Date
  updatedAt: Date
}
export class User {
  private props: UserProps
  constructor({
    createdAt,
    id,
    updatedAt,
    ...props
  }: Replace<UserProps, { id?: string; createdAt?: Date; updatedAt?: Date }>) {
    this.props = {
      createdAt: createdAt || new Date(),
      updatedAt: updatedAt || new Date(),
      id: id || randomUUID(),
      ...props,
    }
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
