import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { Task } from '../../types/task';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-task-list-item',
  imports: [FormsModule, MatCardModule, MatCheckboxModule, MatIconModule],
  templateUrl: './task-list-item.component.html',
  styleUrl: './task-list-item.component.scss',
})
export class TaskListItemComponent {
  task = input<Task>();
  taskClick = output<string>();
  checkClick = output<boolean>();
}
