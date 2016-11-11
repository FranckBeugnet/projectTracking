import { Component, ViewContainerRef } from '@angular/core';
import { RemoteDataService } from '../../services/remoteData.services';
import { LocalDataService } from '../../services/localData.services';
import { ReleaseBO } from '../../bo/releaseBO';
import { BurndownBO } from '../../bo/burndownBO';
import {MdSnackBar, MdSnackBarConfig} from '@angular/material';
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
  }

  responseRefreshReleaseListData(response:ReleaseBO[]){
    this.releasesBO = response;
    this.localDataService.setReleaseList(response);
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
