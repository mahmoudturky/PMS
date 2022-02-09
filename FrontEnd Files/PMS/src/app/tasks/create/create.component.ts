import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Task } from "../task";
import { Project } from "../../projects/project";
import { User } from "../../users/user";

import { TasksService } from "../tasks.service";
import { ProjectsService } from "../../projects/projects.service";
import { UsersService } from "../../users/users.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  projects: Project[] = [];
  employees: User[] = [];
  createForm;

  constructor(
    public tasksService: TasksService,
    public projectsService: ProjectsService,
    public usersService: UsersService,

    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      assignTo: ['', Validators.required],
      endDate: ['', Validators.required],
      description: ['', Validators.required],
      projectId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.projectsService.getProjects().subscribe((data: Project[]) => {
      this.projects = data;
    });
    this.usersService.getUsers().subscribe((data: User[]) => {
      this.employees = data;
    });
  }

  onSubmit(formData: { value: Task; }) {
    this.tasksService.createTask(formData.value).subscribe(res => {
      this.router.navigateByUrl('tasks/list');
    });
  }
}
