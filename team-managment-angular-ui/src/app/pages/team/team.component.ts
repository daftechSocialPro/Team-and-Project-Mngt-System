import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CommonService } from 'src/app/services/common.service';
import { TeamService } from 'src/app/services/team.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTeamComponent } from '../team/add-team/add-team.component';
import { UpdateTeamComponent } from './update-team/update-team.component';
import { ManageMembersComponent } from './manage-members/manage-members.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  providers: [DialogService]
})
export class TeamComponent implements OnInit {
  teams: any;
  loading: boolean = true;
  visible: boolean = false;
  updateTeamVisible: boolean = false;
  ref: DynamicDialogRef | undefined;

  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private teamService: TeamService,
    private commonService: CommonService,
    public dialogService: DialogService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getTeams();
  }

  getTeams() {
    this.teamService.getTeams().subscribe({
      next: (res) => {
        this.teams = res;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getImage(url: string) {
    return this.commonService.createImgPath(url);
  }

  addTeam() {
   this.visible=true
   let modalRef = this.modalService.open(AddTeamComponent,{size:'lg',backdrop:'static'})
   modalRef.result.then(()=>{this.getTeams()})
  }
  updateTeam(team:any) {
    let modalRef = this.modalService.open(UpdateTeamComponent,{size:'lg',backdrop:'static'})
    modalRef.componentInstance.team = team
    modalRef.result.then(()=>{this.getTeams()})
    
   }
   manageMember(team:any) {
    let modalRef = this.modalService.open(ManageMembersComponent,{size:'lg',backdrop:'static'})
    modalRef.componentInstance.team = team
    modalRef.result.then(()=>{this.getTeams()})
   }
  onTeamAdded(team: any) {
    console.log('Team added:', team);
    this.getTeams();
  }
  onTeamUpdate(team: any) {
    console.log('Team updated:', team);
    this.getTeams();
  }
}