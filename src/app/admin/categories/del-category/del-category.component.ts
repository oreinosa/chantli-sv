import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-del-category',
  templateUrl: './del-category.component.html',
  styleUrls: ['./del-category.component.css']
})
export class DelCategoryComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  id: string;
  submitted = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private catService: CategoriesService
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
    this.catService.delete(this.id)
      .then(() => this.onBack())
      .catch(() => this.submitted = false);
  }

  onBack() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

}
