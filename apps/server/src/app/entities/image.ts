import { randomUUID } from 'node:crypto'

import { Replace } from '../helpers/replace'
export interface ImageProps {
  id: string
  url: string
}
export class Image {
  private props: ImageProps
  constructor({ id, ...props }: Replace<ImageProps, { id?: string }>) {
    this.props = {
      id: id || randomUUID(),
      ...props,
    }
  }

  public get id() {
    return this.props.id
  }

  public get url() {
    return this.props.url
  }
}
