import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { LocalDataService } from '../../services/localData.services';
import { BurndownBO } from '../../bo/burndownBO';
import { ReleaseBO } from '../../bo/releaseBO';
import { ContentBO } from '../../bo/contentBO';

@Component({
    templateUrl: 'releaseDetail.component.template.html',
    providers: [LocalDataService]
})

export class ReleaseDetailComponent implements OnInit {

  burndownBOData: BurndownBO[];
  releaseBO: ReleaseBO;
  contentBOData: ContentBO[];
  releaseNumber: string;
  errorMessage: string;
  public lineChartData:Array<any> = [[],[]];
  public lineChartLabels:Array<any> = [];
  public lineChartType:string = 'line';
  public lineChartLegend:boolean = false;

  constructor(
    private localDataService: LocalDataService,
    private route: ActivatedRoute) {
  }

  //get release number in get param
  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      this.releaseNumber = params['id'];
    });
    this.refreshData();
    this.releaseBO=this.localDataService.getReleaseDetail(this.releaseNumber);
    this.contentBOData=this.localDataService.getContentDetail(this.releaseNumber);
  }

  //call remote provider for getting data
  refreshData(): void {
    this.burndownBOData=[];
    this.responseRefreshData(this.localDataService.getBurndownList());
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
