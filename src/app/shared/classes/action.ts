export interface Action {
  route: string; label: string; icon?: string;
}
export class Action {
  constructor(public route: string, public label: string, public icon?: string) { }
}
