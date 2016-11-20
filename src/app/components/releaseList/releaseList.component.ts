import { Component, ViewContainerRef } from '@angular/core';
import { RemoteDataService } from '../../services/remoteData.services';
import { LocalDataService } from '../../services/localData.services';
import { ReleaseBO } from '../../bo/releaseBO';
import { BurndownBO } from '../../bo/burndownBO';
import { ContentBO } from '../../bo/contentBO';
import { MemberBO } from '../../bo/memberBO';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { FilterRelease } from '../../pipes/filterRelease';
import '../../rxjs-operators';

@Component({
    templateUrl: 'releaseList.component.template.html',
    providers: [RemoteDataService,LocalDataService,MdSnackBar]
})

export class ReleaseListComponent {

  errorMessage: string;
  loadingData:boolean=false;
  releasesBO: ReleaseBO[];
  dateData: string;
  inputSheetDataValue: string;
  inputReleaseFilterValue: string = "";

  constructor(
    private remoteDataService: RemoteDataService,
    private localDataService: LocalDataService,
    public snackBar: MdSnackBar,
    public viewContainerRef: ViewContainerRef) {
    this.releasesBO =this.localDataService.getReleaseList();
    this.dateData=this.localDataService.getdateData();
    this.inputSheetDataValue= this.localDataService.getSheetData();
  }

  refreshData(): void {
    this.loadingData=true;
    this.remoteDataService.getReleaseList().subscribe(
                       response => this.responseRefreshReleaseListData(response),
                       error =>  this.errorMessage = <any>error);
  }

  saveData(): void {
    this.localDataService.setSheetData(this.inputSheetDataValue);
    this.showToast('Données sauvegardées','3000');
  }

  responseRefreshReleaseListData(response:ReleaseBO[]){
    this.releasesBO = response;
    this.localDataService.setReleaseList(response);
    this.remoteDataService.getContentList().subscribe(
                      response => this.responseRefreshContentListData(response),
                      error =>  this.errorMessage = <any>error);
  }

  responseRefreshContentListData(response:ContentBO[]){
    this.localDataService.setContentList(response);
    this.remoteDataService.getMemberList().subscribe(
                      response => this.responseRefreshMemberListData(response),
                      error =>  this.errorMessage = <any>error);
  }

  responseRefreshMemberListData(response:MemberBO[]){
    this.localDataService.setMemberList(response);
    this.remoteDataService.getBurndownList().subscribe(
                      response => this.responseRefreshBurndownListData(response),
                      error =>  this.errorMessage = <any>error);
  }

  responseRefreshBurndownListData(response:BurndownBO[]){
    this.localDataService.setBurndownList(response);
    this.localDataService.setdateData();
    this.dateData=this.localDataService.getdateData();
    this.loadingData = false;
    this.showToast('Données mise à jour','3000');
  }

  showToast(message : string, duration : string){
    let config = new MdSnackBarConfig(this.viewContainerRef);
    let simpleSnackBarRef = this.snackBar.open(message, '', config);
    setTimeout(simpleSnackBarRef.dismiss.bind(simpleSnackBarRef), duration);
  }
}
