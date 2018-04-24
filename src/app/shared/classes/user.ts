export interface User {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  workplace?: string;
  fcmTokens?: { [token: string]: true };
}

export class User {
  constructor(public id?: string, public name?: string, public email?: string, public role?: string, public workplace?: string, public fcmTokens?: { [token: string]: true }
  ) { }
}