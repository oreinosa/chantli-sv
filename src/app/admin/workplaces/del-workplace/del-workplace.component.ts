import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { WorkplacesService } from '../workplaces.service';

@Component({
  selector: 'app-del-workplace',
  templateUrl: './del-workplace.component.html',
  styleUrls: ['./del-workplace.component.css']
})
export class DelWorkplaceComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  id: string;
  submitted = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private wpService: WorkplacesService
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
    this.wpService.delete(this.id)
      .then(() => this.onBack())
      .catch(() => this.submitted = false);
  }

  onBack() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
