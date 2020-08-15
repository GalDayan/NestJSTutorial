import { Injectable } from '@nestjs/common';
import { Task } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks = (): Task[] => this.tasks;

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
}
