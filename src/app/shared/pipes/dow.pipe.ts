import { Pipe, PipeTransform } from '@angular/core';

const dow = [
  { day: 'Monday', _day: 'Lunes' },
  { day: 'Tuesday', _day: 'Martes' },
  { day: 'Wednesday', _day: 'Miércoles' },
  { day: 'Thursday', _day: 'Jueves' },
  { day: 'Friday', _day: 'Viernes' },
  { day: 'Saturday', _day: 'Sábado' },
  { day: 'Sunday', _day: 'Domingo' },
]

@Pipe({
  name: 'dow'
})
export class DowPipe implements PipeTransform {

  transform(day: string): string {
    return dow.find(dow => dow.day == day)._day;
  }

}
