import { Injectable} from '@angular/core';
import { ReleaseBO } from '../bo/releaseBO';
import { BurndownBO } from '../bo/burndownBO';
import { ContentBO } from '../bo/contentBO';
import { MemberBO } from '../bo/memberBO';

@Injectable()
export class LocalDataService {

  private releaseListKey = "releaseList";
  private burndownListKey = "burndownList";
  private dateDataKey = "dateData";
  private sheetDataKey = "sheetData";
  private contentDataKey = "contentData";
  private memberDataKey = "memberData";
  private defaultSheetDataValue="1quxG3rmPGlPUtyraANX8LVOc32EAJS4YOlBYUZLnqa4";

  constructor () {}

  setSheetData (data:string) {
    if (data==='fbt'){data=this.defaultSheetDataValue;}
    localStorage.setItem(this.sheetDataKey,data);
  }
  getSheetData () : any {
    let returnvalue :string;
    returnvalue=localStorage.getItem(this.sheetDataKey);
    if (returnvalue==='' || returnvalue === null){returnvalue=this.defaultSheetDataValue;}
    return returnvalue;
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
    return JSON.parse(localStorage.getItem(this.releaseListKey));
  }
  getReleaseDetail (key:string): ReleaseBO{
    let jsonAll=JSON.parse(localStorage.getItem(this.releaseListKey));
    let toReturn : ReleaseBO;
    for (let i in jsonAll){
      if (jsonAll[i].gsx$id.$t===key){
        toReturn=jsonAll[i];
      }
    }
    return toReturn;
  }

  setBurndownList (data:BurndownBO[]) {
    localStorage.setItem(this.burndownListKey, JSON.stringify(data));
  }
  getBurndownList () : any {
    return JSON.parse(localStorage.getItem(this.burndownListKey));
  }

  setMemberList (data:MemberBO[]) {
    localStorage.setItem(this.memberDataKey, JSON.stringify(data));
  }
  getMemberList () : any {
    return JSON.parse(localStorage.getItem(this.memberDataKey));
  }

  setContentList (data:ContentBO[]) {
    localStorage.setItem(this.contentDataKey, JSON.stringify(data));
  }
  getContentList () : any {
    return JSON.parse(localStorage.getItem(this.contentDataKey));
  }
  getContentDetail (key:string): ContentBO[]{
    let jsonAll=JSON.parse(localStorage.getItem(this.contentDataKey));
    let toReturn : ContentBO[]=[];
    for (let i in jsonAll){
      if (jsonAll[i].gsx$id.$t===key){
        toReturn.push(jsonAll[i]);
      }
    }
    return toReturn;
  }

}
