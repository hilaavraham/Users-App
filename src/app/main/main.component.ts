import { Component, OnInit } from '@angular/core';

import { UserService } from './../user.service';
import { User } from '../user-details/user-details.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public onUserSelected!: Function;

  users = this.userService.users;
  selectedUser!: User;
  isCreate = false;

  constructor(private readonly userService: UserService) { 
    userService.getUsers()
      .subscribe(users => {
        this.users = this.userService.users = users;
        this.selectedUser = this.users[0];
      })
  }

  setSelectedUser(user: User) {
    this.selectedUser = user;
  }

  createUser(user: User) {
    const newUser = { ...user, id: this.users.length + 1 };
    this.userService.createUser(newUser)
      .subscribe(response => { 
        this.users = this.userService.users = [...this.users, newUser];
        this.isCreate = false;
        this.selectedUser = this.users[this.users.length-1]
      })
  }

  cancelCreate(user: User) {
    this.isCreate = false;
  }

  ngOnInit(): void {
    this.onUserSelected = this.setSelectedUser.bind(this);
  }

}
