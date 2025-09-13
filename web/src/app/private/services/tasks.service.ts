import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';
import { Task } from '../types/task';
import { UpdateTaskRequest } from '../types/update-task.request';
import { CreateTaskRequest } from '../types/create-task.request';

@Injectable({ providedIn: 'root' })
export class TasksService extends HttpService {
  getAll() {
    return this.get<Task[]>('/tasks');
  }

  create(request: CreateTaskRequest) {
    return this.post<Task>('/tasks', request);
  }

  update(id: string, request: UpdateTaskRequest) {
    return this.post<Task>(`/tasks/${id}`, request);
  }
}
