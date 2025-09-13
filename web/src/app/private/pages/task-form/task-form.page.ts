import { Component, ElementRef, inject, OnInit, viewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { ToolbarComponent } from '../../../shared/components/toolbar/toolbar.component';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { Task } from '../../types/task';
import { TasksService } from '../../services/tasks.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-task-form-page',
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    TaskFormComponent,
    ToolbarComponent,
  ],
  templateUrl: './task-form.page.html',
  styleUrl: './task-form.page.scss',
})
export class TaskFormPage {
  private router = inject(Router);
  private tasksService = inject(TasksService);

  onCancel() {
    this.redirectBack();
  }

  onSubmit(task: Partial<Task>) {
    this.tasksService
      .create({ title: task.title!, description: task.description })
      .pipe(first())
      .subscribe(() => this.redirectBack());
  }

  private redirectBack() {
    this.router.navigate(['..']);
  }
}
