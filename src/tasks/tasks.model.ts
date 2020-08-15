export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export type TaskStatus = 'open' | 'closed' | 'in_progress';
