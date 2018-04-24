export interface SignUp {
  name?: string; email?: string; password?: string; workplace?: string;
}
export class SignUp {
  constructor(public name?: string, public email?: string, public password?: string, public workplace?: string) { }
}
