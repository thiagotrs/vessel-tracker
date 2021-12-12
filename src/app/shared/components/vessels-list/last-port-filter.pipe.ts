import { Pipe, PipeTransform } from '@angular/core';
import { Stop } from 'src/app/core/models/vessel.model';

@Pipe({
  name: 'lastPortFilter'
})
export class LastPortFilterPipe implements PipeTransform {

  transform(stops: Stop[]): string {
    if(!stops.length) return 'none';
    return stops[stops.length - 1].port.name
  }

}
