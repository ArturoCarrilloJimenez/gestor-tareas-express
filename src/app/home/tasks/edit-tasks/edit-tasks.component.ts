import { BasicTask } from './../interface/task.interface';
import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Task } from '../interface/task.interface';
import { TasksService } from '../tasks.service';
import { AuthServiceService } from '../../../auth/auth-service.service';

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
export class EditTasksComponent implements OnChanges {
  @Input() task: Task | null = null;

  @Output()
  emitter: EventEmitter<boolean> = new EventEmitter();

  titleError = signal('');
  error = signal('');

  form: BasicTask = {
    title: '',
    description: '',
  };

  constructor(
    private taskService: TasksService,
    private authService: AuthServiceService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
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

  defaultValues() {
    this.form = {
      title: '',
      description: '',
    };
  }

  addTask() {
    let userId = this.authService.getUserId();

    if (!userId) {
      this.error.set('Error creating task');
      return;
    }

    this.taskService.createTask({ ...this.form, userId: userId }).subscribe({
      next: () => {
        this.taskService.getTasks();
        this.defaultValues();
      },
      error: (error) => {
        console.error(error);
        this.error.set('Error creating task');
      },
    });
  }

  updateTask() {
    let task = this.task;
    task!.title = this.form.title;
    task!.description = this.form.description;

    this.taskService.updateTask(task!).subscribe({
      next: () => {
        this.emitter.emit(true);
        this.defaultValues();
      },
      error: (error) => {
        this.error.set(error.message);
        error.set('Error updating task');
      },
    });
  }
}
