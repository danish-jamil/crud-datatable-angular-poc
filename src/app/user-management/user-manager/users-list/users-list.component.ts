import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { User } from '../models/user.model';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnChanges {
  @Input() users = Array<User>();
  rows = Array<User>();

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    this.rows = this.users;
  }
}
