// import { Subject } from 'rxjs/Subject';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
// import { fadeInOut, fadeIn } from '../../shared/animations';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css', '../../shared/animations.scss'],
  // animations: [fadeInOut, fadeIn]
})
export class ProductsComponent implements OnInit {
  // private ngUnsubscribe = new Subject();

  constructor(
  ) { }

  ngOnInit() {
  }

}
