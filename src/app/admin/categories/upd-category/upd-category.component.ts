import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { CategoriesService } from '../categories.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Category } from '../../../shared/classes/category';
import { LoggerService } from '../../../logger/logger.service';

@Component({
  selector: 'app-upd-category',
  templateUrl: './upd-category.component.html',
  styleUrls: ['./upd-category.component.css']
})
export class UpdCategoryComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  category: Category;

  constructor(
    private catService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute,
    private logger: LoggerService
  ) { }

  ngOnInit() {
    this.route.paramMap
      .takeUntil(this.ngUnsubscribe)
      .do((params: ParamMap) => params.get('id') ? false : this.onBack())
      .switchMap(params => this.catService.get(params.get('id')))
      .takeUntil(this.ngUnsubscribe)
      .do((category: Category) => category ? false : this.onBack())
      .do(category => this.logger.log('Category : ', category))
      .subscribe(category => this.category = category, e => this.onBack())
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSubmit(id: string, category: Category) {
    this.catService.update(id, category)
      .then(() => this.onBack());
  }

  onBack() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

}
