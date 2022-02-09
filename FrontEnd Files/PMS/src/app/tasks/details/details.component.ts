import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Task } from "../task";
import { TasksService } from "../tasks.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  id!: number;
  task!: Task;

  constructor(
    public tasksService: TasksService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['taskId'];
    this.tasksService.getTask(this.id).subscribe((data: Task) => {
      this.task = data;
    });
  }


}
