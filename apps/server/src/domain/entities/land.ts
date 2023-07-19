export interface LandProps {
  id: string
  name: string
}
export class Land {
  private props: LandProps
  constructor(props: LandProps) {
    this.props = props
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
