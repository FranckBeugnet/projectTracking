import { Pipe, PipeTransform } from '@angular/core';
import { ReleaseBO } from '../bo/releaseBO';

@Pipe({name: 'filterRelease'})
export class FilterRelease implements PipeTransform {
  transform(values: ReleaseBO[], key: string){
    let returnValues : ReleaseBO[] = values;

    //filter on custom key
    if(key!='' && key != undefined){
      returnValues= values.filter(item=> item.gsx$application.$t.toLowerCase().indexOf(key.toLowerCase()) >= 0).concat(
        values.filter(item=> item.gsx$version.$t.toLowerCase().indexOf(key.toLowerCase()) >= 0).concat(
        values.filter(item=> item.gsx$start.$t.toLowerCase().indexOf(key.toLowerCase()) >= 0).concat(
        values.filter(item=> item.gsx$end.$t.toLowerCase().indexOf(key.toLowerCase()) >= 0).concat(
        values.filter(item=> item.gsx$status.$t.toLowerCase().indexOf(key.toLowerCase()) >= 0).concat(
        )))));
    }

    //filter on hide release
    returnValues = returnValues.filter(item=> item.gsx$hide.$t.toLowerCase()!='true').concat();

    return returnValues;
  }
}
