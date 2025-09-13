import { Component, ElementRef, input, OnInit, output, viewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Task } from '../../types/task';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule, MatButtonModule, MatInputModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent implements OnInit {
  task = input<Task>();
  autoFocus = input<boolean>(true);

  submitEvent = output<Partial<Task>>();
  cancelEvent = output<void>();

  protected nameElement = viewChild<ElementRef<HTMLInputElement>>('nameInput');

  protected form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    description: new FormControl('', [Validators.maxLength(100)]),
  });

  ngOnInit() {
    this.initAutoFocus();
    this.initForm(this.task());
  }

  protected onCancel() {
    this.form.reset();
    this.cancelEvent.emit();
  }

  protected onSubmit() {
    if (this.form.invalid) return;
    const value = this.form.value;
    this.submitEvent.emit({ title: value.title!, description: value.description ?? undefined });
  }

  private initForm(task?: Task) {
    if (!task) return;
    this.form.setValue({ title: task.title, description: task.description ?? null });
  }

  private initAutoFocus() {
    if (!this.autoFocus()) return;
    this.nameElement()?.nativeElement.focus();
  }
}
