export interface ServerResponse {
  status?: boolean;
  data?: any;
}
export class ServerResponse {
  constructor(public status?: boolean, public data?: any) { }
}
