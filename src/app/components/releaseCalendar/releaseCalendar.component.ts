import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { CalendarEvent, CalendarEventAction} from 'angular2-calendar';
import { subDays, addDays, isSameDay, isSameMonth, addWeeks, subWeeks, addMonths, subMonths} from 'date-fns';
import { LocalDataService } from '../../services/localData.services';

@Component({
    templateUrl: 'releaseCalendar.component.template.html',
    providers: [LocalDataService]
})

export class ReleaseCalendarComponent {

  events: CalendarEvent[] = [];

  constructor(private localDataService: LocalDataService) {
  }

  ngOnInit(): void {
    let temp = this.localDataService.getReleaseList();
    let eventData : CalendarEvent[] = [];
    for (let i in temp){
      eventData.push({
        start: new Date(temp[i].gsx$end.$t),
        end: new Date(temp[i].gsx$end.$t),
        title: temp[i].gsx$application.$t+' '+temp[i].gsx$version.$t,
        color: {primary: temp[i].gsx$color.$t ,secondary: temp[i].gsx$color.$t},
      });
    }
    this.events=eventData;
  }

  view: string = 'month';
  activeDayIsOpen: boolean = false;
  viewDate: Date = new Date();

/*  actions: CalendarEventAction[] = [{
    label: '<i class="fa fa-fw fa-pencil"></i>',
    onClick: ({event}: {event: CalendarEvent}): void => {
      console.log('Edit event', event);
    }
  }, {
    label: '<i class="fa fa-fw fa-times"></i>',
    onClick: ({event}: {event: CalendarEvent}): void => {
      this.events = this.events.filter(iEvent => iEvent !== event);
    }
  }];*/

  //events: CalendarEvent[] = [];
  /*events: CalendarEvent[] = [{
    start: new Date(),
    end: new Date(),
    title: 'ConsoleMVE 2.6.1',
    color: {primary: '#ad2121',secondary: '#FAE3E3'},
    actions: this.actions
  },
  {
    start: new Date(),
    end: new Date(),
    title: 'ConsoleMVE 2.7.2',
    color:  {primary: '#ad2121',secondary: '#FAE3E3'},
    actions: this.actions
  }];*/

  increment(): void {
    const addFn: any = {
      day: addDays,
      week: addWeeks,
      month: addMonths
    }[this.view];
    this.viewDate = addFn(this.viewDate, 1);
  }

  decrement(): void {
    const subFn: any = {
      day: subDays,
      week: subWeeks,
      month: subMonths
    }[this.view];
    this.viewDate = subFn(this.viewDate, 1);
  }

  today(): void {
    this.viewDate = new Date();
  }

  dayClicked({date, events}: {date: Date, events: CalendarEvent[]}): void {
    /*if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }*/
    let msg = '';
    for (let i in events){
      msg += events[i].title+'\n';
    }
    alert(msg);
  }
}
