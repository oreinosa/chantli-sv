import { Component, OnInit } from '@angular/core';
import { Workplace } from '../../../shared/classes/workplace';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkplacesService } from '../workplaces.service';

@Component({
  selector: 'app-add-workplace',
  templateUrl: './add-workplace.component.html',
  styleUrls: ['./add-workplace.component.css']
})
export class AddWorkplaceComponent implements OnInit {
  workplace: Workplace;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private wpService: WorkplacesService
  ) { }

  ngOnInit() {
    this.initProduct();
  }

  initProduct() {
    this.workplace = new Workplace();
  }

  onSubmit(workplace: Workplace) {
    this.wpService.add(workplace)
      .then(() => this.onBack());
  }

  onBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
