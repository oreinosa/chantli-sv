export interface SignIn {
    email?: string;
    password?: string;
}
export class SignIn{
    constructor(public email?: string, public password?: string) {}
}