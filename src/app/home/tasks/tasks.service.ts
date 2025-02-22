import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BasicTask, Task } from './interface/task.interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private URL = 'http://localhost:3000/api/task';

  public tasks: Task[] = [];

  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http
      .get<Task[]>(this.URL)
      .pipe(
        map((tasks) =>
          tasks.map((task) => {
            task.id = task._id;
            delete task._id;
            return task;
          })
        )
      )
      .subscribe((tasks: Task[]) => {
        this.tasks = tasks;
      });
  }

  createTask(task: BasicTask) {
    return this.http.post(this.URL, task);
  }

  updateTask(task: Task) {
    return this.http.put(this.URL, task);
  }

  deleteTask(task: Task) {
    return this.http.delete(`${this.URL}/${task.id}`);
  }
}
