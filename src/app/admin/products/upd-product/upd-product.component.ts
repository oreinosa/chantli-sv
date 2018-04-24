import { Product } from './../../../shared/classes/product';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ProductsService } from './../products.service';
import { CategoriesService } from './../../categories/categories.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from '../../../shared/classes/category';
import { Router, ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router/src/shared';
import { UploaderService } from '../../../uploader/uploader.service';
import { LoggerService } from '../../../logger/logger.service';

@Component({
  selector: 'app-upd-product',
  templateUrl: './upd-product.component.html',
  styleUrls: ['./upd-product.component.css'],
})
export class UpdProductComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  product: Product;
  categories: Observable<Category[]>;
  image: any;
  imageURL: string;


  constructor(
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private uploadService: UploaderService,
    private router: Router,
    private route: ActivatedRoute,
    private logger: LoggerService
  ) { }

  ngOnInit() {
    this.categories = this.categoriesService.getAll();
    this.route.paramMap
      .takeUntil(this.ngUnsubscribe)
      .do((params: ParamMap) => params.get('id') ? false : this.onBack())
      .switchMap(params => this.productsService.get(params.get('id')))
      .takeUntil(this.ngUnsubscribe)
      .do((product: Product) => product ? false : this.onBack())
      .do(product => this.logger.log('Product : ', product))
      .subscribe(
      product => { this.product = product; this.imageURL = this.product ? this.product.imageURL : null },
      e => this.onBack());

  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  previewImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.image = event.target.files[0];
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageURL = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onSubmit(id: string, product: Product) {
    console.log(this.image);
    if (this.image) {
      this.uploadService
        .onUploadFile(this.image)
        .then(a => {
          console.log(a.downloadURL);
          product.imageURL = a.downloadURL;
          this.productsService.update(id, product)
            .then(() => this.onBack());
        })
        .catch(() => this.image = null);
    } else {
      this.productsService.update(id, product)
        .then(() => this.onBack());
    }
  }

  onBack() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

}
