import { Injectable } from '@nestjs/common';
import { Task } from './tasks.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks = (): Task[] => this.tasks;

  createTask = (title: string, description: string): Task => {
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: 'open',
    };

    this.tasks.push(task);

    return task;
  };
}
