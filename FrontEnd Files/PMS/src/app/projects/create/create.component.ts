import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Project } from "../project";
import { User } from "../../users/user";
import { ProjectsService } from "../projects.service";
import { UsersService } from "../../users/users.service";


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  managers: User[] = [];
  createForm;

  constructor(
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
    });
  }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe((data: User[]) => {
      this.managers = data;
    });
  }

  onSubmit(formData: { value: Project; }) {
    this.projectsService.createProject(formData.value).subscribe(res => {
      this.router.navigateByUrl('projects/list');
    });
  }
}

