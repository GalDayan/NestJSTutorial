import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks = (): Task[] => this.tasks;

  getTasksWithFilter(filter: GetTaskFilterDto): Task[] {
    const { status, search } = filter;

    let filteredTasks = this.getAllTasks();

    if (status) {
      filteredTasks = filteredTasks.filter(task => task.status === status);
    }

    if (search) {
      filteredTasks = filteredTasks.filter(
        task =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    return filteredTasks;
  }

  getTaskById(id: string): Task {
    const foundTask = this.tasks.find(task => task.id === id);

    if (!foundTask) {
      throw new NotFoundException();
    }

    return foundTask;
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
