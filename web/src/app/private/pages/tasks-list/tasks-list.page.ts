import { Component, computed, ElementRef, inject, OnInit, signal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { first } from 'rxjs';
import { ToolbarComponent } from '../../../shared/components/toolbar/toolbar.component';
import { TaskListItemComponent } from '../../components/task-list-item/task-list-item.component';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../types/task';

@Component({
  selector: 'app-tasks-list-page',
  imports: [
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    ToolbarComponent,
    TaskListItemComponent,
  ],
  templateUrl: './tasks-list.page.html',
  styleUrl: './tasks-list.page.scss',
})
export class TasksListPage implements OnInit {
  private tasksService = inject(TasksService);

  protected tasks = signal<{ todo: Task[]; done: Task[] }>({ todo: [], done: [] });
  protected showDone = signal(false);
  protected showDoneIcon = computed(() => `expand_${this.showDone() ? 'less' : 'more'}`);
  protected showDoneCount = computed(() => this.tasks().done.length);

  ngOnInit() {
    this.getAll();
  }

  protected checkTask(task: Task, done: boolean) {
    this.tasksService
      .update(task.id, { done })
      .pipe(first())
      .subscribe(() => this.getAll());
  }

  protected toggleShowDone() {
    this.showDone.update((done) => !done);
  }

  private getAll() {
    this.tasksService
      .getAll()
      .pipe(first())
      .subscribe((res) => {
        const todo = res.filter((t) => !t.done);
        const done = res.filter((t) => t.done);
        this.tasks.set({ todo, done });
      });
  }
}
