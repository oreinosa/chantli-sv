import { Router, ActivatedRoute } from '@angular/router';
import { CategoriesService } from './../../categories/categories.service';
import { Observable } from 'rxjs/Observable';
import { Category } from './../../../shared/classes/category';
import { Product } from './../../../shared/classes/product';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { UploaderService } from '../../../uploader/uploader.service';
import { LoggerService } from '../../../logger/logger.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  product: Product;
  categories: Observable<Category[]>;
  image: any;
  imageURL: any;

  constructor(
    private catService: CategoriesService,
    private productsService: ProductsService,
    private uploadService: UploaderService,
    private router: Router,
    private route: ActivatedRoute,
    private logger: LoggerService
  ) { }

  ngOnInit() {
    this.initProduct();
    this.categories = this.catService.getAll();
  }

  initProduct() {
    this.product = new Product();
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


  onSubmit(product: Product) {
    // this.logger.log(this.image);
    this.uploadService
      .onUploadFile(this.image)
      .then(a => {
        // this.logger.log(a.downloadURL);
        product.imageURL = a.downloadURL;
        this.productsService.add(product)
          .then(() => this.onBack());
      })
      .catch(() => this.image = null);
  }

  onBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
