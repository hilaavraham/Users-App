import { Component } from '@angular/core';
import { UsersService } from './users.service';

@Component({
    selector: 'users',
    template: `
    <h2> {{ getTitle() }}</h2>
    <ul>
        <li *ngFor="let user of users" >
        {{ user}}
        </li>
        
    </ul>
    `
})

export class UsersComponent { 
    title = 'List of Users';
    getTitle() { 
        return this.title;
    }
    users;
    
    constructor(service: UsersService) { 
        this.users = service.getUsers();
    }
}