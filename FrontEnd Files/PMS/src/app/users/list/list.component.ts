import { Component, OnInit } from '@angular/core';
import { User } from "../user";
import { UsersService } from "../users.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {

  users: User[] = [];

  constructor(public usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  deleteUser(id: string) {
    this.usersService.deleteUser(id).subscribe(res => {
      this.users = this.users.filter(item => item.id !== id);
    });
  }
}

