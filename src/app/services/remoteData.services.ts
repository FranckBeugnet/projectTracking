import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ReleaseBO } from '../bo/releaseBO';
import { BurndownBO } from '../bo/burndownBO';
import { ContentBO } from '../bo/contentBO';
import { Observable }     from 'rxjs/Observable';
import { LocalDataService } from '../services/localData.services';

@Injectable()
export class RemoteDataService {

  private dataUrlRelease = 'https://spreadsheets.google.com/feeds/list/googleSheetKey/1/public/values?alt=json';  // URL to web API
  private dataUrlBurndown = 'https://spreadsheets.google.com/feeds/list/googleSheetKey/2/public/values?alt=json';  // URL to web API
  private dataUrlContent = 'https://spreadsheets.google.com/feeds/list/googleSheetKey/3/public/values?alt=json';  // URL to web API
  private googleSheetKey : string;

  constructor (private http: Http,
    private localDataService:LocalDataService) {
    this.googleSheetKey=this.localDataService.getSheetData();
  }

  getReleaseList (): Observable<ReleaseBO[]> {
    console.log("XHR Request to : " + this.dataUrlRelease);
    return this.http.get(this.dataUrlRelease.replace('googleSheetKey',this.googleSheetKey))
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  getBurndownList (): Observable<BurndownBO[]> {
    console.log("XHR Request to : " + this.dataUrlBurndown);
    return this.http.get(this.dataUrlBurndown.replace('googleSheetKey',this.googleSheetKey))
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  getContentList (): Observable<ContentBO[]> {
    console.log("XHR Request to : " + this.dataUrlContent);
    return this.http.get(this.dataUrlContent.replace('googleSheetKey',this.googleSheetKey))
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  private extractData(res: Response) {
    let body = res.json();
    return body.feed.entry || { };
  }
  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error("XHR Request error : " + errMsg);
    return Observable.throw(errMsg);
  }
}
