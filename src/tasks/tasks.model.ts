export interface Task {
  id: string;
  title: string;
  description: string;
  status: StatusType;
}

export type StatusType = 'open' | 'closed' | 'in_progress';
