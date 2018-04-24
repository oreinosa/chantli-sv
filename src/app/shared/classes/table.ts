import { OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import { DAO } from './dao';
import { LoggerService } from '../../logger/logger.service';
import "rxjs/add/operator/takeUntil";

export class Table<T> implements OnInit, AfterViewInit, OnDestroy {
    private ngUnsubscribe = new Subject();
    public displayedColumns?: string[];
    public sort?: MatSort;
    public paginator?: MatPaginator;
    public dataSource: MatTableDataSource<T> = new MatTableDataSource();

    constructor(
        private service: DAO<T>,
        private logger: LoggerService
    ) {

    }

    ngOnInit() {
        this.service
            .getAll()
            .takeUntil(this.ngUnsubscribe)
            .do(orders => this.logger.log('Table data : ', orders))
            .subscribe(orders => {
                this.dataSource.data = orders;
            });
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
