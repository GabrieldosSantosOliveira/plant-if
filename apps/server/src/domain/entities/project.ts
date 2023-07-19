import { Replace } from '../helpers/replace'

export interface ProjectProps {
  id: string
  codeShareForTeachers: string
  codeShareForStudents: string
  title: string
  startDate: Date
  endDate: Date
  management: string[]
  resources: string[]
  createdAt: Date
  updatedAt: Date
}
export class Project {
  private props: ProjectProps

  constructor({
    createdAt,
    updatedAt,
    ...props
  }: Replace<
    ProjectProps,
    {
      createdAt?: Date
      updatedAt?: Date
    }
  >) {
    this.props = {
      createdAt: createdAt || new Date(),
      updatedAt: updatedAt || new Date(),
      ...props,
    }
  }

  public get id() {
    return this.props.id
  }

  public get codeShareForTeachers() {
    return this.props.codeShareForTeachers
  }

  public set codeShareForTeachers(codeShareForTeachers: string) {
    this.props.codeShareForTeachers = codeShareForTeachers
  }

  public get codeShareForStudents() {
    return this.props.codeShareForStudents
  }

  public set codeShareForStudents(codeShareForStudents: string) {
    this.props.codeShareForStudents = codeShareForStudents
  }

  public get title() {
    return this.props.title
  }

  public set title(title: string) {
    this.props.title = title
  }

  public get startDate() {
    return this.props.startDate
  }

  public set startDate(startDate: Date) {
    this.props.startDate = startDate
  }

  public get endDate() {
    return this.props.endDate
  }

  public set endDate(endDate: Date) {
    this.props.endDate = endDate
  }

  public get management() {
    return this.props.management
  }

  public set management(management: string[]) {
    this.props.management = management
  }

  public get resources() {
    return this.props.resources
  }

  public set resources(resources: string[]) {
    this.props.resources = resources
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
