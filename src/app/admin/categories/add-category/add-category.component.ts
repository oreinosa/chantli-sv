import { Component, OnInit } from '@angular/core';
import { Category } from '../../../shared/classes/category';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  category: Category;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private catService: CategoriesService
  ) { }

  ngOnInit() {
    this.initProduct();
  }

  initProduct() {
    this.category = new Category();
  }

  onSubmit(category: Category) {
    this.catService.add(category)
      .then(() => this.onBack());
  }

  onBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
