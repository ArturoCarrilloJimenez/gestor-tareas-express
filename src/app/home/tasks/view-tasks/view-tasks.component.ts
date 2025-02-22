import { Task } from './../interface/task.interface';
import { Component } from '@angular/core';
import { TasksService } from '../tasks.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-view-tasks',
  imports: [CommonModule, MatIconModule],
  templateUrl: './view-tasks.component.html',
  styleUrl: './view-tasks.component.css',
})
export class ViewTasksComponent {
  get tasks() {
    return this.taskService.tasks;
  }

  displayedColumns: string[] = ['title', 'description', 'completed'];

  constructor(private taskService: TasksService) {}

  ngOnInit() {
    this.taskService.getTasks();
  }

  changeTaskStatus(task: Task) {
    task.complete = !task.complete;
    this.taskService.updateTask(task).subscribe();
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe({
      next: () => {
        this.taskService.getTasks();
      }
    });
  }

  editTask(task: Task) {
  }
}
