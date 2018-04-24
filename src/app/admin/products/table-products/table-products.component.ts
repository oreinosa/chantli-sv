import { ProductsService } from './../products.service';
import { MatPaginator, MatSort } from '@angular/material';
import { Component, ViewChild } from '@angular/core';
import { Product } from '../../../shared/classes/product';
import { Table } from '../../../shared/classes/table';
import { LoggerService } from '../../../logger/logger.service';

@Component({
  selector: 'app-table-products',
  templateUrl: './table-products.component.html',
  styleUrls: ['./table-products.component.css']
})
export class TableProductsComponent extends Table<Product> {
  displayedColumns = ['name', 'category', 'cost', 'imageURL', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private productsService: ProductsService,
    private loggerService: LoggerService
  ) {
    super(productsService, loggerService);
  }

}
