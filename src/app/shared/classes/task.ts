import { Status } from "./status";

export interface Task {
  id?: string;
  description?: string;
  status?: any;
  userId?: string;
  completedTimestamp?: number;
}
export class Task {
  constructor(
    public id?: string,
    public description?: string,
    public status?: any,
    public userId?: string,
    public completedTimestamp?: number
  ) { }
}