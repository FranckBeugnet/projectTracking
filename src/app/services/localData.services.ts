import { Injectable } from '@angular/core';
import { ReleaseBO } from '../bo/releaseBO';
import { BurndownBO } from '../bo/burndownBO';

@Injectable()
export class LocalDataService {

  private releaseListKey = "releaseList";
  private burndownListKey = "burndownList";
  private dateDataKey = "dateData";
  private sheetDataKey = "sheetData";
  private defaultSheetDataValue="1quxG3rmPGlPUtyraANX8LVOc32EAJS4YOlBYUZLnqa4";

  constructor () {}

  setSheetData (data:string) {
    localStorage.setItem(this.sheetDataKey,data);
  }
  getSheetData () : any {
    let temp = localStorage.getItem(this.sheetDataKey);
    if (temp === undefined || temp==='') {
      temp=this.defaultSheetDataValue
    }
    return temp;
  }

  setdateData () {
    localStorage.setItem(this.dateDataKey,(new Date()).toISOString().substr(0,19).replace('T',' '));
  }
  getdateData () : any {
    return localStorage.getItem(this.dateDataKey);
  }

  setReleaseList (data:ReleaseBO[]) {
    localStorage.setItem(this.releaseListKey, JSON.stringify(data));
  }
  getReleaseList () : any {
    return JSON.parse(localStorage.getItem(this.releaseListKey));;
  }

  setBurndownList (data:BurndownBO[]) {
    localStorage.setItem(this.burndownListKey, JSON.stringify(data));
  }
  getBurndownList () : any {
    return JSON.parse(localStorage.getItem(this.burndownListKey));;
  }

}
