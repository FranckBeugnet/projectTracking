import { Component } from '@angular/core';
import { LocalDataService } from '../../services/localData.services';
import { MemberBO } from '../../bo/memberBO';

@Component({
    templateUrl: 'teamMember.component.template.html',
    providers: [LocalDataService]
})

export class TeamMemberComponent {

  TeamMember: MemberBO[];

  constructor(
    private localDataService: LocalDataService,) {
    this.TeamMember =this.localDataService.getMemberList();
  }

}
