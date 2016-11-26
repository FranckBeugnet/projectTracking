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

  public barChartLabels:string[] = ['Major', 'Medium', 'Low'];
  public barChartData:Array<any> = [ [2, 2, 1],[3, 3, 3]];

  public barChartType:string = 'bar';
  public pieChartType:string = 'pie';
  public lineChartType:string = 'line';

  public lineChartData:Array<any> = [[],[]];
  public lineChartLabels:Array<any> = [];
  public lineChartLegend:boolean = false;
  public pieChartLabels:string[] =[];
  public pieChartData:number[] = [];
  public pieChartLabels2:string[] =[];
  public pieChartData2:number[] = [];
  public chartOptions:any = {
    animation: false,
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // red
      backgroundColor: 'rgba(255,255,255,0.0)',
      borderColor: 'rgba(221,0,0,1)',
      pointBackgroundColor: 'rgba(221,0,0,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#fff'
    },
    { // blue
      backgroundColor: 'rgba(159,222,255,0.2)',
      borderColor: 'rgba(00,81,125,1)',
      pointBackgroundColor: '#00517D',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#fff'
    },
  ];
  public barChartColors:Array<any> = [
    {backgroundColor:"#DD0000",},{backgroundColor:"#00517D"}
  ];
  public pieChartColors:Array<any> = [
    { backgroundColor: ["#00517D", "#00753A", "#7979FF", "#BBBB00","#808080","#FF8000"] }
  ];


  constructor(
    private localDataService: LocalDataService,
    private route: ActivatedRoute) {
  }

  //get release number in get param
  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      this.releaseNumber = params['id'];
    });
    this.releaseBO=this.localDataService.getReleaseDetail(this.releaseNumber);
    this.contentBOData=this.localDataService.getContentDetail(this.releaseNumber);
    this.burndownBOData=this.localDataService.getBurndownList();
    this.refreshChart(this.contentBOData,this.burndownBOData,this.releaseBO);
  }

  refreshChartFromTemplate(): void {
    this.refreshChart(this.contentBOData,this.burndownBOData,this.releaseBO);
  }

  //call remote provider for getting data
  refreshChart(contentData:ContentBO[],burndownData:BurndownBO[],releaseData:ReleaseBO): void {
    this.responseRefreshDataContent(contentData);
    this.responseRefreshDataBurndown(burndownData);
    this.responseRefreshQualityContent(releaseData);
    setTimeout(function(){
      let myelement: HTMLElement;
      try{
        myelement=<HTMLElement>document.getElementsByClassName("chartjs-hidden-iframe")[0];
        myelement.style.height="200px";
        myelement=<HTMLElement>document.getElementsByClassName("chartjs-hidden-iframe")[1];
        myelement.style.height="200px";
      }catch (e) {/*pas de graph => on ignore*/}
    },700);
  }

  //parse data for graphs Content
  responseRefreshDataContent(response:ContentBO[]){
    let tempLabels :string[] =[];
    let tempData:number[] = [];
    for (let i in response){
      if(+response[i].gsx$allestimate.$t!=0){
        tempLabels.push(response[i].gsx$ref.$t);
        tempData.push(+response[i].gsx$allestimate.$t);
      }
    }
    this.pieChartLabels=tempLabels;
    this.pieChartData=tempData;

    tempLabels =[];
    tempData = [];
    for (let i in response){
      if (tempLabels.indexOf(response[i].gsx$status.$t) === -1){
        tempLabels.push(response[i].gsx$status.$t);
        tempData.push(1);
      }else{
        tempData[tempLabels.indexOf(response[i].gsx$status.$t)]=tempData[tempLabels.indexOf(response[i].gsx$status.$t)]+1;
      }
    }
    this.pieChartLabels2=tempLabels;
    this.pieChartData2=tempData;
  }

  //parse data for graph Burndown
  responseRefreshDataBurndown(response:BurndownBO[]){
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

  //parse data for graph Burndown
  responseRefreshQualityContent(data:ReleaseBO){
    let tempBarChartData :Array<any>  = [];
    var serie1:Array<any> =[];
    var serie2:Array<any> =[];
    serie1.push(data.gsx$openissueshigh.$t);
    serie2.push(data.gsx$totalissueshigh.$t);
    serie1.push(data.gsx$openissuesmedium.$t);
    serie2.push(data.gsx$totalissuesmedium.$t);
    serie1.push(data.gsx$openissueslow.$t);
    serie2.push(data.gsx$totalissueslow.$t);
    tempBarChartData.push(serie1,serie2);
    this.barChartData = tempBarChartData;
  }

}
