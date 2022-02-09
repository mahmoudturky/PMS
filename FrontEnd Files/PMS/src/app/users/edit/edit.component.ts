import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from "../user";
import { UsersService } from "../users.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {

  id!: string;
  user!: User;
  roles: Role[] = [];
  editForm;

  constructor(
    public usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.editForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['taskId'];

    this.usersService.getUser(this.id).subscribe((data: User) => {
      this.user = data;
      this.editForm.patchValue(data);
    });
  }

  onSubmit(formData: { value: User; }) {
    this.usersService.updateUser(this.id, formData.value).subscribe(res => {
      this.router.navigateByUrl('users/list');
    });
  }
}

