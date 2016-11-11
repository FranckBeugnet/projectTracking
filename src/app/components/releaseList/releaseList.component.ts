import { Component } from '@angular/core';
import { RemoteDataService } from '../../services/remoteData.services';
import { ReleaseBO } from '../../bo/releaseBO';
import '../../rxjs-operators';

@Component({
    templateUrl: 'releaseList.component.template.html',
    providers: [RemoteDataService]
})

export class ReleaseListComponent {

  errorMessage: string;
  loadingData:boolean=false;
  releasesBO: ReleaseBO[];

  constructor(
    private remoteDataService: RemoteDataService) {
    this.refreshData();
  }

  refreshData(): void {
    this.loadingData=true;
    this.releasesBO=[];
    this.remoteDataService.getReleaseList().subscribe(
                       response => this.responseRefreshData(response),
                       error =>  this.errorMessage = <any>error);
    }

  responseRefreshData(response:ReleaseBO[]){
    this.releasesBO = response;
    this.loadingData = false;
  }

}
