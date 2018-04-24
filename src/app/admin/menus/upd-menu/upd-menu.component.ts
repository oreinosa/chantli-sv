import { Component, OnInit } from '@angular/core';
import { Menu } from '../../../shared/classes/menu';
import { Product } from '../../../shared/classes/product';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuService } from '../menu.service';
import { ProductsService } from '../../products/products.service';
import { ParamMap } from '@angular/router/src/shared';
import { LoggerService } from '../../../logger/logger.service';

@Component({
  selector: 'app-upd-menu',
  templateUrl: './upd-menu.component.html',
  styleUrls: ['./upd-menu.component.css']
})
export class UpdMenuComponent implements OnInit {
  date: string;
  menu: Menu;
  products: Product[];
  filteredProducts: Observable<Product[]>;
  selProducts: Product[] = [];
  delProducts: Product[] = [];
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
      .do(products => this.logger.log('All products : ', products))
      .take(1)
      .subscribe(products => this.products = products);
    this.filteredProducts = this.selProductCtrl.valueChanges
      .map(product => product ? this.filterProducts(product) : this.products.slice());
    this.route.paramMap
      .take(1)
      .map((params: ParamMap) => params.get('id'))
      // .do(id => this.logger.log(id))
      .subscribe(id => this.initProduct(id));
  }

  filterProducts(name: string) {
    return this.products.filter(product =>
      product.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  initProduct(id: string) {
    this.menuService.get(id)
      .take(1)
      .do(menu => {
        menu.date.setHours(0);
        const textDate = menu.date.toISOString().substr(0, 10);
        this.date = textDate;
        // this.logger.log(this.date);   
        this.menu = menu;
      })
      .switchMap(menu => this.menuService.getMenuProducts(menu.id))
      .take(1)
      .do(products => this.logger.log('Menu products : ', products))
      .subscribe(products => this.selProducts = products);
  }

  onAddProduct() {
    const product = this.products.find(product => product.name == this.selProductCtrl.value);
    // this.logger.log('added product ', product);
    if (product) {
      this.selProducts.push(product);
      // this.logger.log(this.selProducts);
    }
    this.selProductCtrl.setValue(null);
    this.refresh = !this.refresh;
  }

  onRemoveProduct(product: Product) {
    // this.logger.log('removing ', product);
    const index = this.selProducts.findIndex(_product => _product.name == product.name);
    // this.logger.log(index);
    if (index >= 0) {
      this.selProducts.splice(index, 1);
      if (product.id) {
        this.delProducts.push(product);
        this.logger.log('del products : ', this.delProducts);
      }
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
    this.selProducts = this.selProducts.filter(product => !product.id);
    this.menuService.update(this.menu.id, menu, this.selProducts, this.delProducts)
      .then(() => this.onBack());
  }

  onBack() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

}
