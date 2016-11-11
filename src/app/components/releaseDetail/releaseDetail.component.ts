import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { RemoteDataService } from '../../services/remoteData.services';
import { BurndownBO } from '../../bo/burndownBO';

@Component({
    templateUrl: 'releaseDetail.component.template.html',
    providers: [RemoteDataService]
})

export class ReleaseDetailComponent implements OnInit {

  burndownBOData: BurndownBO[];
  releaseNumber: string;
  errorMessage: string;
  public lineChartData:Array<any> = [[],[]];
  public lineChartLabels:Array<any> = [];
  public lineChartType:string = 'line';
  public lineChartLegend:boolean = false;

  constructor(
    private remoteDataService: RemoteDataService,
    private route: ActivatedRoute) {
    this.refreshData();
  }

  //get release number in get param
  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      this.releaseNumber = params['id'];
    });
  }

  //call remote provider for getting data
  refreshData(): void {
    this.burndownBOData=[];
    this.remoteDataService.getBurndownList().subscribe(
                       response => this.responseRefreshData(response),
                       error =>  this.errorMessage = <any>error);
  }

  //parse data for graph var
  responseRefreshData(response:BurndownBO[]){
    var lineChartLabelsTemp:Array<any> =[];
    var lineChartDataTemp:Array<any> = [];
    var serie1:Array<any> =[];
    var serie2:Array<any> =[];
    this.burndownBOData = response;
    for (var i in this.burndownBOData){
      if (this.releaseNumber===this.burndownBOData[i].gsx$id.$t){
        lineChartLabelsTemp.push(this.burndownBOData[i].gsx$date.$t);
        if(this.burndownBOData[i].gsx$val1.$t != ''){
           serie1.push(this.burndownBOData[i].gsx$val1.$t);
        }
        if(this.burndownBOData[i].gsx$val2.$t != ''){
          serie2.push(this.burndownBOData[i].gsx$val2.$t);
        }
      }
    }
    lineChartDataTemp.push(serie1,serie2);
    this.lineChartLabels = lineChartLabelsTemp;
    this.lineChartData = lineChartDataTemp;

  }

}
