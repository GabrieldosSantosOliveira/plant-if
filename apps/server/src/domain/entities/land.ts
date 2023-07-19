import { randomUUID } from 'node:crypto'

import { Replace } from '../helpers/replace'
export interface LandProps {
  id: string
  name: string
}
export class Land {
  private props: LandProps
  constructor({ id, ...props }: Replace<LandProps, { id?: string }>) {
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
