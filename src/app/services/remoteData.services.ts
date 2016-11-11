import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ReleaseBO } from '../bo/releaseBO';
import { BurndownBO } from '../bo/burndownBO';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class RemoteDataService {

  private dataUrlRelease = 'https://spreadsheets.google.com/feeds/list/1quxG3rmPGlPUtyraANX8LVOc32EAJS4YOlBYUZLnqa4/1/public/values?alt=json';  // URL to web API
  private dataUrlBurndown = 'https://spreadsheets.google.com/feeds/list/1quxG3rmPGlPUtyraANX8LVOc32EAJS4YOlBYUZLnqa4/2/public/values?alt=json';  // URL to web API

  constructor (private http: Http) {}

  getReleaseList (): Observable<ReleaseBO[]> {
    console.log("XHR Request to : " + this.dataUrlRelease);
    return this.http.get(this.dataUrlRelease)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  getBurndownList (): Observable<BurndownBO[]> {
    console.log("XHR Request to : " + this.dataUrlBurndown);
    return this.http.get(this.dataUrlBurndown)
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
