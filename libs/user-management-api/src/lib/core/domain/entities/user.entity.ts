export class User {
  public id: string;
  public email: string;
  public password: string;
  public isEnabled: boolean;

  constructor(
    id: string,
    email: string,
    password: string,
    isEnabled = true, // Default to true if not provided
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.isEnabled = isEnabled;
  }
}
export class Role {
  constructor(
    public readonly id: string,
    public readonly name: string,
  ) { }
}
