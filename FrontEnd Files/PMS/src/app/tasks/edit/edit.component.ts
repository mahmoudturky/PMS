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
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {  

  id!: number;
  task!: Task;
  projects: Project[] = [];
  employees: User[] = [];
  editForm;

  constructor(
    public tasksService: TasksService,
    public usersService: UsersService,
    public projectsService: ProjectsService,    
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.editForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      assignTo: ['', Validators.required],
      endDate: ['', Validators.required],
      description: ['', Validators.required],
      projectId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['taskId'];

    this.tasksService.getTask(this.id).subscribe((data: Task) => {
      this.task = data;
    });

    this.projectsService.getProjects().subscribe((data: Project[]) => {
      this.projects = data;
    });    
    this.usersService.getUsers().subscribe((data: User[]) => {
      this.employees = data;
    });
  }

  onSubmit(formData: { value: Task; }) {
    this.tasksService.updateTask(this.id, formData.value).subscribe(res => {
      this.router.navigateByUrl('tasks/list');
    });
  }
}
