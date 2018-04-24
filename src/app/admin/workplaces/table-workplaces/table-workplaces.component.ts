import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { WorkplacesService } from '../workplaces.service';
import { LoggerService } from '../../../logger/logger.service';
import { Table } from '../../../shared/classes/table';
import { Workplace } from '../../../shared/classes/workplace';

@Component({
  selector: 'app-table-workplaces',
  templateUrl: './table-workplaces.component.html',
  styleUrls: ['./table-workplaces.component.css']
})
export class TableWorkplacesComponent extends Table<Workplace> {
  displayedColumns = ['name', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private wpService: WorkplacesService,
    private loggerService: LoggerService
  ) {
    super(wpService, loggerService);
  }

}
