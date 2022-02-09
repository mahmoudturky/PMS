import { Task } from "../tasks/task";

export interface Project {
  id: number;
  name: string;
  assignTo: string;
  createdBy: string;
  createdDate: string | null;
  endDate: string;
  description: string;
  tasks: Task[];
}
