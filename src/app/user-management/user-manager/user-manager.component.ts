import { Component, OnInit } from '@angular/core';
import { User } from './models/user.model';
import { UsersService } from './services/users.service';
import { Entity } from '@admin/models/entity';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit {
  users = Array<User>();

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersService
      .getAll()
      .subscribe((users: User[]) => (this.users = users));
  }
}
