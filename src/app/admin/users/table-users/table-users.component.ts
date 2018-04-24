import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { UsersService } from '../../../admin/users/users.service';
import { LoggerService } from '../../../logger/logger.service';
import { Table } from '../../../shared/classes/table';
import { User } from '../../../shared/classes/user';

@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.css']
})
export class TableUsersComponent extends Table<User> {
  displayedColumns = ['id', 'name', 'email', 'workplace', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private usersService: UsersService,
    private loggerService: LoggerService
  ) {
    super(usersService, loggerService);
  }

}
