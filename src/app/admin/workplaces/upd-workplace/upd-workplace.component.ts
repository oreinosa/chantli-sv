import { Component, OnInit } from '@angular/core';
import { Workplace } from '../../../shared/classes/workplace';
import { Subject } from 'rxjs/Subject';
import { WorkplacesService } from '../workplaces.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LoggerService } from '../../../logger/logger.service';

@Component({
  selector: 'app-upd-workplace',
  templateUrl: './upd-workplace.component.html',
  styleUrls: ['./upd-workplace.component.css']
})
export class UpdWorkplaceComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  workplace: Workplace;

  constructor(
    private wpService: WorkplacesService,
    private router: Router,
    private route: ActivatedRoute,
    private logger: LoggerService
  ) { }

  ngOnInit() {
    this.route.paramMap
      .takeUntil(this.ngUnsubscribe)
      .do((params: ParamMap) => params.get('id') ? false : this.onBack())
      .switchMap(params => this.wpService.get(params.get('id')))
      .takeUntil(this.ngUnsubscribe)
      .do((workplace: Workplace) => workplace ? false : this.onBack())
      .do(workplace => this.logger.log('Workplace : ', workplace))
      .subscribe(workplace => this.workplace = workplace, e => this.onBack())
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSubmit(id: string, workplace: Workplace) {
    this.wpService.update(id, workplace)
      .then(() => this.onBack());
  }

  onBack() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

}
