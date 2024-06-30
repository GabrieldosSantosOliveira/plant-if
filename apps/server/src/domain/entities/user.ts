import { Replace } from "../helpers/replace";
export enum UserRoles {
  STUDENT = "STUDENT",
  TECHNICIAN = "TECHNICIAN",
}
export interface UserProps {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  resetPasswordSecret?: string;
  createdAt: Date;
  updatedAt: Date;
  role: UserRoles;
}
export interface UserModel extends UserProps {}

export class User {
  private props: UserProps;
  constructor({
    createdAt,
    updatedAt,
    ...props
  }: Replace<UserProps, { createdAt?: Date; updatedAt?: Date }>) {
    this.props = {
      createdAt: createdAt || new Date(),
      updatedAt: updatedAt || new Date(),
      ...props,
    };
  }

  public get password() {
    return this.props.password;
  }

  public set password(password: string | undefined) {
    this.props.password = password;
  }

  public get resetPasswordSecret() {
    return this.props.resetPasswordSecret;
  }

  public set resetPasswordSecret(resetPasswordSecret: string | undefined) {
    this.props.resetPasswordSecret = resetPasswordSecret;
  }

  public get id() {
    return this.props.id;
  }

  public get email() {
    return this.props.email;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get firstName() {
    return this.props.firstName;
  }

  public set firstName(firstName: string) {
    this.props.firstName = firstName;
  }

  public get lastName() {
    return this.props.lastName;
  }

  public set lastName(lastName: string) {
    this.props.lastName = lastName;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public get updatedAt() {
    return this.props.updatedAt;
  }

  public set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
  }
}
