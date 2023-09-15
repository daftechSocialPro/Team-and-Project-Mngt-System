import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService, UserView } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TeamService, TeamView } from 'src/app/services/team.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-update-team',
  templateUrl: './update-team.component.html',
  styleUrls: ['./update-team.component.scss']
})
export class UpdateTeamComponent implements OnInit {

  @Input() team :TeamView;

  user!: UserView;

  getEmployeeList: any[];
  getProjectList: any[];
  selectedEmployees: any[] = [];
  selectedProjects: any[] = [];
  TeamForm!: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private messageService: MessageService,
    private teamService: TeamService,
    private activeModal: NgbActiveModal 
  ) { }

  ngOnInit(): void {
    this.fetchEmployeeList();
    this.fetchProjectList();


    this.TeamForm = this.formBuilder.group({
      teamName: [null, Validators.required],
      teamEmployees: [null, Validators.required],
      teamProjects: [null, Validators.required]
    })

   console.log(this.team)
   this.TeamForm.controls['teamName'].setValue(this.team.teamName )
   this.TeamForm.controls['teamEmployees'].setValue( this.team.teamEmployees.map(item => ({ value: item.id, name: item.name })) )

  }

  fetchEmployeeList() {
    this.teamService.getSelectedEmployee().subscribe(
      (data) => {
        this.getEmployeeList = data;
      },
      (error) => {
        console.error('Failed to fetch employee list:', error);
      }
    );
  }

  fetchProjectList() {
    this.teamService.getProjectOnTeam().subscribe(
      {
        next: (res) => {
          this.getProjectList = res

        }
      });
  }

  onSubmit() {
    if (this.TeamForm.valid) {
     
      var addTeam:any={
        
          teamName:this.TeamForm.value.teamName,
          createdById: this.user.UserID,
          teamEmployees:this.TeamForm.value.teamEmployees.map(item=>item.id),
          teamProjects: this.TeamForm.value.teamProjects.map(item=>item.id)
        }
        this.teamService.createTeam(addTeam).subscribe({
          next: (res) => {
            if (res.success) {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: res.message
              });

              this.TeamForm.reset();
          
             
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Something went Wrong',
                detail: res.message
              });
            }
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Something went Wrong',
              detail: err
            });
          }
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Form Submit failed.',
          detail: 'Please fill required inputs!!'
        });
    }
  }

  onEmployeeChange(event: any) {
    this.selectedEmployees = event.value;
  }

  onProjectChange(event: any) {
    this.selectedProjects = event.value;
  }



  getImage(url: string) {
    return this.commonService.createImgPath(url);
  }
  closeModal(){
    this.activeModal.close()
  }
}