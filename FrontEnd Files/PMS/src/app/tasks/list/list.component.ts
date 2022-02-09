import { Component, OnInit } from '@angular/core';
import { Task } from "../task";
import { TasksService } from "../tasks.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  tasks: Task[] = [];

  constructor(public tasksService: TasksService) { }

  ngOnInit(): void {
    this.tasksService.getTasks().subscribe((data: Task[]) => {
      this.tasks = data;
    });
  }

  deleteTask(id: number) {
    this.tasksService.deleteTask(id).subscribe(res => {
      this.tasks = this.tasks.filter(item => item.id !== id);
    });
  }
}
