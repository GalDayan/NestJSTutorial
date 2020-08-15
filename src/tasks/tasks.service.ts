import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks = (): Task[] => this.tasks;

  getTaskById(id: string): Task {
    return this.tasks.find(task => task.id === id);
  }

  createTask = (createTaskDto: CreateTaskDto): Task => {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: 'open',
    };

    this.tasks.push(task);

    return task;
  };

  deleteTask = (id: string): Task[] => {
    this.tasks = this.tasks.filter(task => task.id !== id);
    return this.tasks;
  };

  updateTask = (id: string, status: TaskStatus): Task => {
    const task = this.getTaskById(id);
    task.status = status;

    return task;
  };
}
