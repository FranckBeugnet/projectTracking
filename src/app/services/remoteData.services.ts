import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ReleaseBO } from '../bo/releaseBO';
import { BurndownBO } from '../bo/burndownBO';
import { ContentBO } from '../bo/contentBO';
import { MemberBO } from '../bo/memberBO';
import { Observable }     from 'rxjs/Observable';
import { LocalDataService } from '../services/localData.services';

var CryptoJS = require("crypto-js");
var AES = require("crypto-js/aes");

@Injectable()
export class RemoteDataService {

  private dataUrlRelease = 'https://spreadsheets.google.com/feeds/list/googleSheetKey/1/public/values?alt=json';  // URL to web API
  private dataUrlBurndown = 'https://spreadsheets.google.com/feeds/list/googleSheetKey/2/public/values?alt=json';  // URL to web API
  private dataUrlContent = 'https://spreadsheets.google.com/feeds/list/googleSheetKey/3/public/values?alt=json';  // URL to web API
  private dataUrlTeam = 'https://spreadsheets.google.com/feeds/list/googleSheetKey/4/public/values?alt=json';  // URL to web API
  private googleSheetKey : string;

  constructor (private http: Http,
    private localDataService:LocalDataService) {
  }

  getReleaseList (): Observable<ReleaseBO[]> {
    this.googleSheetKey=this.localDataService.getSheetData();
    console.log("XHR Request to : " + this.dataUrlRelease.replace('googleSheetKey',this.googleSheetKey));
    return this.http.get(this.dataUrlRelease.replace('googleSheetKey',this.googleSheetKey))
                    .map(this.extractDataRelease)
                    .catch(this.handleError);
  }
  getBurndownList (): Observable<BurndownBO[]> {
    console.log("XHR Request to : " + this.dataUrlBurndown.replace('googleSheetKey',this.googleSheetKey));
    return this.http.get(this.dataUrlBurndown.replace('googleSheetKey',this.googleSheetKey))
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  getContentList (): Observable<ContentBO[]> {
    console.log("XHR Request to : " + this.dataUrlContent.replace('googleSheetKey',this.googleSheetKey));
    return this.http.get(this.dataUrlContent.replace('googleSheetKey',this.googleSheetKey))
                    .map(this.extractDataContent)
                    .catch(this.handleError);
  }
  getMemberList (): Observable<MemberBO[]> {
    console.log("XHR Request to : " + this.dataUrlTeam.replace('googleSheetKey',this.googleSheetKey));
    return this.http.get(this.dataUrlTeam.replace('googleSheetKey',this.googleSheetKey))
                    .map(this.extractDataTeam)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.feed.entry || { };
  }

  private extractDataTeam(res: Response) {
    let body = res.json();
    let AESKey=localStorage.getItem('AESKey');
    //data to decode ?
    if (AESKey != undefined && AESKey != ''){
      for (let i in body.feed.entry){
        try {
          var bytes  = AES.decrypt(body.feed.entry[i].gsx$name.$t, AESKey);
          var plaintext = bytes.toString(CryptoJS.enc.Utf8);
          if(plaintext!=''){body.feed.entry[i].gsx$name.$t=plaintext;}

          var bytes  = AES.decrypt(body.feed.entry[i].gsx$function.$t, AESKey);
          var plaintext = bytes.toString(CryptoJS.enc.Utf8);
          if(plaintext!=''){body.feed.entry[i].gsx$function.$t=plaintext;}

          var bytes  = AES.decrypt(body.feed.entry[i].gsx$gsm.$t, AESKey);
          var plaintext = bytes.toString(CryptoJS.enc.Utf8);
          if(plaintext!=''){body.feed.entry[i].gsx$gsm.$t=plaintext;}

          var bytes  = AES.decrypt(body.feed.entry[i].gsx$mail.$t, AESKey);
          var plaintext = bytes.toString(CryptoJS.enc.Utf8);
          if(plaintext!=''){body.feed.entry[i].gsx$mail.$t=plaintext;}
        }catch (e) {}
      }
    }
    return body.feed.entry || { };
  }

  private extractDataContent(res: Response) {
    let body = res.json();
    let AESKey=localStorage.getItem('AESKey');
    //data to decode ?
    if (AESKey != undefined && AESKey != ''){
      for (let i in body.feed.entry){
        try {
          var bytes  = AES.decrypt(body.feed.entry[i].gsx$ref.$t, AESKey);
          var plaintext = bytes.toString(CryptoJS.enc.Utf8);
          if(plaintext!=''){body.feed.entry[i].gsx$ref.$t=plaintext;}

          var bytes  = AES.decrypt(body.feed.entry[i].gsx$detail.$t, AESKey);
          var plaintext = bytes.toString(CryptoJS.enc.Utf8);
          if(plaintext!=''){body.feed.entry[i].gsx$detail.$t=plaintext;}

          var bytes  = AES.decrypt(body.feed.entry[i].gsx$devestimate.$t, AESKey);
          var plaintext = bytes.toString(CryptoJS.enc.Utf8);
          if(plaintext!=''){body.feed.entry[i].gsx$devestimate.$t=plaintext;}

          var bytes  = AES.decrypt(body.feed.entry[i].gsx$allestimate.$t, AESKey);
          var plaintext = bytes.toString(CryptoJS.enc.Utf8);
          if(plaintext!=''){body.feed.entry[i].gsx$allestimate.$t=plaintext;}

          var bytes  = AES.decrypt(body.feed.entry[i].gsx$status.$t, AESKey);
          var plaintext = bytes.toString(CryptoJS.enc.Utf8);
          if(plaintext!=''){body.feed.entry[i].gsx$status.$t=plaintext;}
        }catch (e) {}
      }
    }
    return body.feed.entry || { };
  }

  private extractDataRelease(res: Response) {
    let body = res.json();
    let AESKey=localStorage.getItem('AESKey');
    //data to decode ?
    if (AESKey != undefined && AESKey != ''){
      for (let i in body.feed.entry){
        try {
          var bytes  = AES.decrypt(body.feed.entry[i].gsx$application.$t, AESKey);
          var plaintext = bytes.toString(CryptoJS.enc.Utf8);
          if(plaintext!=''){body.feed.entry[i].gsx$application.$t=plaintext;}

          var bytes  = AES.decrypt(body.feed.entry[i].gsx$version.$t, AESKey);
          var plaintext = bytes.toString(CryptoJS.enc.Utf8);
          if(plaintext!=''){body.feed.entry[i].gsx$version.$t=plaintext;}

          var bytes  = AES.decrypt(body.feed.entry[i].gsx$comment.$t, AESKey);
          var plaintext = bytes.toString(CryptoJS.enc.Utf8);
          if(plaintext!=''){body.feed.entry[i].gsx$comment.$t=plaintext;}

        }catch (e) {}
      }
    }
    return body.feed.entry || { };
  }
  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error("XHR Request error : " + errMsg);
    return Observable.throw(errMsg);
  }

}
