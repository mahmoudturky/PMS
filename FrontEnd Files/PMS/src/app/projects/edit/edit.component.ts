import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Project } from "../project";
import { User } from "../../users/user";
import { ProjectsService } from "../projects.service";
import { UsersService } from "../../users/users.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {

  id!: number;
  project!: Project;
  managers: User[] = [];
  editForm;

  constructor(
    public projectsService: ProjectsService,
    public userService: UsersService,
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
    });

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['projectId'];

    this.userService.getUsers().subscribe((data: User[]) => {
      this.managers = data;
    });

    this.projectsService.getProject(this.id).subscribe((data: Project) => {
      this.project = data;
      this.editForm.patchValue(data);
    });

  }

  onSubmit(formData: { value: Project; }) {
    this.projectsService.updateProject(this.id, formData.value).subscribe(res => {
      this.router.navigateByUrl('projects/list');
    });
  }

}
