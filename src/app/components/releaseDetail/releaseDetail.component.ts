import { Component } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

@Component({
    templateUrl: 'releaseDetail.component.template.html',
})

export class ReleaseDetailComponent {

  public lineChartData:Array<any> = [
    [100, 72, 70, 50,],
    [100, 75, 50, 25,0]
  ];
  public lineChartLabels:Array<any> = ['31/10/2016', '07/11/2016', '14/11/2016', '21/11/2016', '05/12/2016'];
  public lineChartType:string = 'line';
  public lineChartLegend:boolean = false;

}
