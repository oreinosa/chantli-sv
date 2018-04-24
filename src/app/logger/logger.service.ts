import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {
  enabled = true;

  constructor() { }

  log(...args) {
    if (this.enabled) {
      console.log.apply(console, args);
    }
  }

}
