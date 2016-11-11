import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';
import { HttpModule }    from '@angular/http';
import { RouterModule }   from '@angular/router';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { AppComponent }   from './app.component';
import { ReleaseDetailComponent }   from './components/releaseDetail/releaseDetail.component';
import { ReleaseListComponent }   from './components/releaseList/releaseList.component';

@NgModule({
  imports: [
    BrowserModule,
    MaterialModule.forRoot(),
    HttpModule,
    ChartsModule,
    RouterModule.forRoot([
      { path: 'D:/androidProjects/projectTracking-Webpack/dist', component: ReleaseListComponent },
      { path: 'D:/D:/androidProjects/projectTracking-Webpack/dist', component: ReleaseListComponent },
      { path: 'android_asset/www/', component: ReleaseListComponent },
      { path: '', component: ReleaseListComponent },
      { path: 'releaseDetail/:id', component: ReleaseDetailComponent }
    ])
  ],
  declarations: [
    AppComponent,
    ReleaseDetailComponent,
    ReleaseListComponent
  ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
