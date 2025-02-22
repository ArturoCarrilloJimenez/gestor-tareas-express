import { Component } from '@angular/core';
import { EditTasksComponent } from '../tasks/edit-tasks/edit-tasks.component';
import { ViewTasksComponent } from '../tasks/view-tasks/view-tasks.component';
import { Task } from '../tasks/interface/task.interface';

@Component({
  selector: 'app-home-page',
  imports: [EditTasksComponent, ViewTasksComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  constructor() {}

  task: Task | null = null;

  isUpdate(update: boolean) {
    if (update) {
      this.task = null;
    }
  }

  editTask(task: Task) {
    this.task = task;
  }
}
