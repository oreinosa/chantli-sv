import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../../../shared/animations';

@Component({
  selector: 'app-step-4',
  templateUrl: './step-4.component.html',
  styleUrls: ['./step-4.component.css'],
  animations: [fadeIn]
})
export class Step4Component implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
