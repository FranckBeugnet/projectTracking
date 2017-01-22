import { Injectable} from '@angular/core';
import { RemoteDataService } from './remoteData.services';
import { LocalDataService } from './localData.services';
import { ReleaseBO } from '../bo/releaseBO';
import { BurndownBO } from '../bo/burndownBO';
import { ContentBO } from '../bo/contentBO';
import { MemberBO } from '../bo/memberBO';

@Injectable()
export class RefreshDataService {

  constructor(
    private remoteDataService: RemoteDataService,
    private localDataService: LocalDataService) {
  }

  refreshAllData(): void {
    this.remoteDataService.getReleaseList().subscribe(
                       response => this.responseRefreshReleaseListData(response),
                       error =>  this.refreshError(<any>error));
  }

  responseRefreshReleaseListData(response:ReleaseBO[]){
    this.localDataService.setReleaseList(response);
    this.remoteDataService.getContentList().subscribe(
                      response => this.responseRefreshContentListData(response),
                      error =>  this.refreshError(<any>error));
  }

  responseRefreshContentListData(response:ContentBO[]){
    this.localDataService.setContentList(response);
    this.remoteDataService.getMemberList().subscribe(
                      response => this.responseRefreshMemberListData(response),
                      error =>  this.refreshError(<any>error));
  }

  responseRefreshMemberListData(response:MemberBO[]){
    this.localDataService.setMemberList(response);
    this.remoteDataService.getBurndownList().subscribe(
                      response => this.responseRefreshBurndownListData(response),
                      error =>  this.refreshError(<any>error));
  }

  responseRefreshBurndownListData(response:BurndownBO[]){
    this.localDataService.setBurndownList(response);
    this.localDataService.setdateData();
  }

  refreshError(errorMessage:string){
    console.log(errorMessage);
  }

}
