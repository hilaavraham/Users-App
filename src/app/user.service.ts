import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, tap } from 'rxjs';

import { User } from './user-details/user-details.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public users: User[] = [];

  constructor(private readonly http: HttpClient) { 
  }

  getUsers(): Observable<User[]>{ 
    return this.http.get<User[]>(environment.serverUrl);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(environment.serverUrl, user);
  }
  
  updateUser(user: User): Observable<User> {
    return this.http.patch<User>(environment.serverUrl + '/' + user.id, user);
  }

  deleteUser(user: User): Observable<User> {
    return this.http.delete<User>(environment.serverUrl + '/' + user.id).pipe(
      tap(() => { 
        const index = this.users.indexOf(user);
        this.users.splice(index, 1);
      })
    );
  }
}
