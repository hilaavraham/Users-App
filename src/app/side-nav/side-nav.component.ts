
import { Component, Input } from '@angular/core';

import { User } from '../user-details/user-details.component';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {

  @Input() users: User[] | null = [];
  @Input() onUserSelected!: Function ;

}
