import { BasicTask } from './../interface/task.interface';
import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Task } from '../interface/task.interface';

@Component({
  selector: 'app-edit-tasks',
  imports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './edit-tasks.component.html',
  styleUrl: './edit-tasks.component.css',
})
export class EditTasksComponent {
  @Input() task: Task | undefined;

  titleError = signal('');
  error = signal('');

  form: BasicTask = {
    title: '',
    description: '',
  };

  ngOnInit() {
    if (this.task) {
      this.form.title = this.task.title;
      this.form.description = this.task.description;
    }
  }

  validate() {
    if (!this.form.title) {
      this.titleError.set('Title is required');
    }

    if (this.form.title) {
      this.titleError.set('');
      this.error.set('');

      return true;
    }

    return false;
  }

  submit() {
    if (this.validate()) {
      if (this.task) {
        this.updateTask();
      } else {
        this.addTask();
      }
    }
  }

  addTask() {
    console.log('add task');
  }

  updateTask() {
    console.log('update task' + this.task?.id);
  }
}
