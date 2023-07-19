import { randomUUID } from 'node:crypto'

import { Replace } from '../helpers/replace'
import { Technician } from './technician'
import { User } from './user'

export interface ProjectProps {
  id: string
  students: User[]
  teachers: User[]
  codeShareForTeachers: string
  codeShareForStudents: string
  title: string
  technician: Technician[]
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
    id,
    updatedAt,
    codeShareForStudents,
    codeShareForTeachers,
    ...props
  }: Replace<
    ProjectProps,
    {
      id?: string
      createdAt?: Date
      updatedAt?: Date
      codeShareForTeachers?: string
      codeShareForStudents?: string
    }
  >) {
    this.props = {
      codeShareForStudents: codeShareForStudents || randomUUID(),
      codeShareForTeachers: codeShareForTeachers || randomUUID(),
      createdAt: createdAt || new Date(),
      updatedAt: updatedAt || new Date(),
      id: id || randomUUID(),
      ...props,
    }
  }

  public get id() {
    return this.props.id
  }

  public get students() {
    return this.props.students
  }

  public set students(students: User[]) {
    this.props.students = students
  }

  public get teachers() {
    return this.props.teachers
  }

  public set teachers(teachers: User[]) {
    this.props.teachers = teachers
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

  public get technician() {
    return this.props.technician
  }

  public set technician(technician: Technician[]) {
    this.props.technician = technician
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
