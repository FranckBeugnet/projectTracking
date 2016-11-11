import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ReleaseBO } from '../bo/releaseBO';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class RemoteDataService {

  private dataUrl = 'https://spreadsheets.google.com/feeds/list/1quxG3rmPGlPUtyraANX8LVOc32EAJS4YOlBYUZLnqa4/od6/public/values?alt=json';  // URL to web API

  constructor (private http: Http) {}

  getReleaseList (): Observable<ReleaseBO[]> {
    console.log("XHR Request to : " + this.dataUrl);
    return this.http.get(this.dataUrl)
                    .map(this.extractDataRelease)
                    .catch(this.handleError);
  }
  private extractDataRelease(res: Response) {
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
