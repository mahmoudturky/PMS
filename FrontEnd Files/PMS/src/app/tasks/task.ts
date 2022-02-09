import { Project } from "../projects/project";

export interface Task {
  id: number;
  name: string;
  assignTo: string;
  createdBy: string;
  createdDate: string | null;
  endDate: string;
  description: string;
  projectId: number;
  project: Project;
}
