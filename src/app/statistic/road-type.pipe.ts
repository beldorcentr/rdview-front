import { Pipe, PipeTransform } from '@angular/core';
import { RoadType } from './road-type';

@Pipe({
  name: 'roadType'
})
export class RoadTypePipe implements PipeTransform {

  transform(value: RoadType, args?: any): any {
    switch (value) {
      case RoadType.Local:
        return 'Местная';
      case RoadType.Republican:
        return 'Республиканская';
      case RoadType.Magistral:
        return 'Магистральная';
    }
    return 'Другая';
  }

}
