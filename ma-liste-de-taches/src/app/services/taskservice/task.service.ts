// task.service.ts
import { Injectable } from '@angular/core';
import { Task } from '../../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [];

  constructor() {
    
    this.tasks = [
      { id: 1, description: 'Faire les courses', completed: false },
      { id: 2, description: 'Apprendre Angular', completed: true },
      { id: 3, description: 'Prendre un café', completed: false },

    ];
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(task: Task) {
    this.tasks.push(task);
  }

  deleteTask(task: Task) {
    const index = this.tasks.indexOf(task, 0);
    if (index > -1) {
      this.tasks.splice(index, 1);
    }
  }
}
