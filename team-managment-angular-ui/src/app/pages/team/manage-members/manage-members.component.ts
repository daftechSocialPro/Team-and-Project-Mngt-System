import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TeamService, TeamView } from 'src/app/services/team.service';
import { CommonService } from 'src/app/services/common.service';
import { UserView, UserService } from 'src/app/services/user.service';
import { ITeamMemberDto } from './ITeamMemberDto';

@Component({
  selector: 'app-manage-members',
  templateUrl: './manage-members.component.html',
  styleUrls: ['./manage-members.component.scss']
})
export class ManageMembersComponent implements OnInit {
  @Input() team: TeamView;
  user: UserView;
  sourceEmployees: any[] = [];
  targetEmployees: any[] = [];
  teamId: any;

  constructor(
    private commonService: CommonService,
    private messageService: MessageService,
    private userService: UserService,
    private teamService: TeamService,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.teamId = this.team.id;
    this.fetchEmployees(this.teamId);
  }

  fetchEmployees(teamId: any) {
    this.teamService.getTeamMembersSelectList(teamId).subscribe(
      {
        next: (res) => {

          this.sourceEmployees = res
        }, error: (err) => {
          console.error('Failed to fetch employee list:', err);
        }
      }


    );

    this.teamService.getEmployeeNotInTeam(teamId).subscribe(
      {
        next: (res) => {

          this.targetEmployees = res
        }, error: (err) => {
          console.error('Failed to fetch employee list:', err);
        }
      }
    );
  }
  async addToTeam(event: any) {
 
    const selectedEMployees = event.items.map(i => i.id)
   
    if (selectedEMployees) {

      const data = {
        teamId: this.teamId,
        employeeList: selectedEMployees,
        createdBy: this.user.UserID
      };


      this.teamService.addMember(data).subscribe({
        next: (res) => {

          if (res){
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: res.message
            });

          }
          else{
            this.messageService.add({
              severity: 'error',
              summary: 'Something went wrong!!',
              detail: res.message
            });

          }

        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Something went wrong!!',
            detail: err
          });
        }
      })
    }
  }
  async removeFromTeam(event:any) { 
    const selectedEMployees = event.items.map(i => i.id)
   
    if (selectedEMployees) {

      const data: ITeamMemberDto = {
        employeeList: selectedEMployees,
        teamId: this.teamId      
        
      };


      this.teamService.removeMember(data).subscribe({
        next: (res) => {

          if (res){
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: res.message
            });

          }
          else{
            this.messageService.add({
              severity: 'error',
              summary: 'Something went wrong!!',
              detail: res.message
            });

          }

        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Something went wrong!!',
            detail: err
          });
        }
      })
    }
  }
  getImage(url: string) {
    return this.commonService.createImgPath(url);
  }

  closeModal() {
    this.activeModal.close();
  }
}
