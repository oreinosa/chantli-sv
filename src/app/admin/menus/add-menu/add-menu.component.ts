import { Component, OnInit } from '@angular/core';
import { Menu } from '../../../shared/classes/menu';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuService } from '../menu.service';
import { ProductsService } from '../../products/products.service';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../../shared/classes/product';
import { FormControl } from '@angular/forms';
import { LoggerService } from '../../../logger/logger.service';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent implements OnInit {
  menu: Menu;
  products: Product[];
  filteredProducts: Observable<Product[]>;
  selProducts: Product[] = [];
  selProductCtrl: FormControl;
  refresh = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private menuService: MenuService,
    private productsService: ProductsService,
    private logger: LoggerService
  ) {
    this.selProductCtrl = new FormControl('');
  }

  ngOnInit() {
    this.productsService.getAll(true)
      .do(products => this.logger.log(products))
      .take(1)
      .subscribe(products => this.products = products);
    this.filteredProducts = this.selProductCtrl.valueChanges
      .map(product => product ? this.filterProducts(product) : this.products.slice());
    this.initProduct();
  }

  filterProducts(name: string) {
    return this.products.filter(product =>
      product.name.toLowerCase().indexOf(name.toLowerCase()) === 0)
  }

  initProduct() {
    this.menu = new Menu();
  }

  onAddProduct() {
    const product = this.products.find(product => product.name == this.selProductCtrl.value);
    if (product) {
      this.selProducts.push(product);
      this.logger.log(this.selProducts);
    }
    this.selProductCtrl.setValue(null);
    this.refresh = !this.refresh;
  }

  onRemoveProduct(product: Product) {
    const index = this.selProducts.findIndex(_product => _product.name === product.name);
    if (index >= 0) {
      this.selProducts.splice(index, 1);
      this.refresh = !this.refresh;
    }
  }

  onSubmit(menu: Menu) {
    // this.logger.log(date);
    let date = new Date(menu.date);
    date.setDate(date.getDate() + 1);
    menu.date = date;
    this.logger.log(menu);
    // this.logger.log(this.selProducts);
    this.menuService.add(menu, this.selProducts)
      .then(() => this.onBack());
  }

  onBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
