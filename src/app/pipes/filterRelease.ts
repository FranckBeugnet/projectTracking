import { Pipe, PipeTransform } from '@angular/core';
import { ReleaseBO } from '../bo/releaseBO';

@Pipe({name: 'filterRelease'})
export class FilterRelease implements PipeTransform {
  transform(values: ReleaseBO[], key: string){
    if(key==='' || key === undefined){
      return values;
    }else{
      return values.filter(item=> item.gsx$application.$t.toLowerCase().indexOf(key.toLowerCase()) >= 0).concat(
        values.filter(item=> item.gsx$version.$t.toLowerCase().indexOf(key.toLowerCase()) >= 0).concat(
        values.filter(item=> item.gsx$start.$t.toLowerCase().indexOf(key.toLowerCase()) >= 0).concat(
        values.filter(item=> item.gsx$end.$t.toLowerCase().indexOf(key.toLowerCase()) >= 0).concat(
        ))));
    }
  }
}
