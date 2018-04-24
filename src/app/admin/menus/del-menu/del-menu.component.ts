import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-del-menu',
  templateUrl: './del-menu.component.html',
  styleUrls: ['./del-menu.component.css']
})
export class DelMenuComponent implements OnInit {

  private ngUnsubscribe = new Subject();
  id: string;
  submitted = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private menuService: MenuService
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
    this.menuService.delete(this.id)
      .then(() => this.onBack())
      .catch(() => this.submitted = false);
  }

  onBack() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

}
