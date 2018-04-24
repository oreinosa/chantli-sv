import { Subject } from 'rxjs/Subject';
import { ProductsService } from './../products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ParamMap } from '@angular/router/src/shared';

@Component({
  selector: 'app-del-product',
  templateUrl: './del-product.component.html',
  styleUrls: ['./del-product.component.css'],
})
export class DelProductComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  id: string;
  submitted = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) { }

  ngOnInit() {
    this.route.paramMap
      .takeUntil(this.ngUnsubscribe)
      .subscribe((params: ParamMap) => this.id = params.get('id'));
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSubmit() {
    this.submitted = true;
    this.productsService.delete(this.id)
      .then(() => this.onBack())
      .catch(() => this.submitted = false);
  }

  onBack() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
