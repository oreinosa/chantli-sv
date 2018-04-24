export interface Link {
  route?: string; label?: string; icon?: string; children?: Link[];
}
export class Link {
  constructor(public route?: string, public label?: string, public icon?: string, public children?: Link[]) { }
}
