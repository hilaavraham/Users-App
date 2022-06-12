
import { Component, Input, OnInit } from '@angular/core';

import { UserService } from '../user.service';

export interface User {
  id: Number,
  name: String,
  username: String,
  email: String,
  address: any,
  phone: String
}

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
  
export class UserDetailsComponent implements OnInit {
  @Input() user!: User;

  isEdit = false; 

  constructor(private readonly userService: UserService) {   
  }
  
  updateUser(user: User) {
    const index = this.userService.users.indexOf(this.user);
    this.userService.updateUser(user)
      .subscribe(user => {
        this.userService.users[index] = user;
        this.user = user;
        this.isEdit = false;
      });    
  }
  cancelUpdate(user: User) {
    this.isEdit = false;
  }

  deleteUser(user: User) { 
    if(confirm("Are you sure you want to delete "+user.name)) {
      console.log("Implement delete functionality here");
      this.userService.deleteUser(user)
      .subscribe(response => { 
        console.log(response);
      })
    }
  }

  ngOnInit(): void {
  }

}
