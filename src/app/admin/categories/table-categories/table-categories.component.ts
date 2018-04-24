import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { CategoriesService } from '../categories.service';
import { Category } from '../../../shared/classes/category';
import { Table } from '../../../shared/classes/table';
import { LoggerService } from '../../../logger/logger.service';

@Component({
  selector: 'app-table-categories',
  templateUrl: './table-categories.component.html',
  styleUrls: ['./table-categories.component.css']
})
export class TableCategoriesComponent extends Table<Category> {
  displayedColumns = ['name', 'description', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private categoriesService: CategoriesService,
    private loggerService: LoggerService
  ) {
    super(categoriesService, loggerService);
  }
}
