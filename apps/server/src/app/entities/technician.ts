import { randomUUID } from 'crypto'

import { Replace } from '../helpers/replace'

export interface TechnicianProps {
  id: string
  email: string
  firstName: string
  lastName: string
  image?: string
  createdAt: Date
  updatedAt: Date
}
export class Technician {
  private props: TechnicianProps
  constructor({
    createdAt,
    id,
    updatedAt,
    ...props
  }: Replace<
    TechnicianProps,
    { id?: string; createdAt?: Date; updatedAt?: Date }
  >) {
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
