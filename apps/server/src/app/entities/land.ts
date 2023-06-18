import { randomUUID } from 'node:crypto'

import { Replace } from '../helpers/replace'
export interface UserProps {
  id: string
  name: string
}
export class User {
  private props: UserProps
  constructor({ id, ...props }: Replace<UserProps, { id?: string }>) {
    this.props = {
      id: id || randomUUID(),
      ...props,
    }
  }

  public get id() {
    return this.props.id
  }

  public get name() {
    return this.props.name
  }

  public set name(name: string) {
    this.props.name = name
  }
}
