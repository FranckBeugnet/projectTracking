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

  loadingData:boolean=false;
  releasesBO: ReleaseBO[];
  dateData: string;
  inputSheetDataValue: string;
  AESKeyDataValue: string;
  inputReleaseFilterValue: string = "";

  constructor(
    private remoteDataService: RemoteDataService,
    private localDataService: LocalDataService,
    public snackBar: MdSnackBar,
    public viewContainerRef: ViewContainerRef) {
    this.releasesBO =this.localDataService.getReleaseList();
    this.dateData=this.localDataService.getdateData();
    this.inputSheetDataValue= this.localDataService.getSheetData();
    this.AESKeyDataValue= this.localDataService.getAESKeyData();
    //auto-refresh one time by day
    if (this.dateData === null ||this.dateData === undefined || this.dateData.slice(0,10)!=(new Date()).toISOString().slice(0,10)){
      this.refreshData();
    }
    //auto-refresh each hour
    /*if(appComponent.singletonUpdate===false){
      appComponent.singletonUpdate=true;
      setInterval(() => {
      this.refreshData();
      }, 5000 );
    }*/
  }

  //get release number in get param
  ngOnInit(): void {

  }

  refreshData(): void {
    this.loadingData=true;
    this.remoteDataService.getReleaseList().subscribe(
                       response => this.responseRefreshReleaseListData(response),
                       error =>  this.refreshError(<any>error));
  }

  saveData(): void {
    this.localDataService.setSheetData(this.inputSheetDataValue);
    this.localDataService.setAESKeyData(this.AESKeyDataValue);
    this.showToast('Données sauvegardées','3000');
  }

  responseRefreshReleaseListData(response:ReleaseBO[]){
    this.releasesBO = response;
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
    this.dateData=this.localDataService.getdateData();
    this.loadingData = false;
    this.showToast('Données mise à jour','3000');
  }

  refreshError(errorMessage:string){
      this.loadingData = false;
      this.showToast(errorMessage,'3000');
  }

  showToast(message : string, duration : string){
    let config = new MdSnackBarConfig(this.viewContainerRef);
    let simpleSnackBarRef = this.snackBar.open(message, '', config);
    setTimeout(simpleSnackBarRef.dismiss.bind(simpleSnackBarRef), duration);
  }

}
