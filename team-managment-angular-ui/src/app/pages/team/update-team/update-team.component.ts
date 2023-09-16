import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService, UserView } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem, MessageService } from 'primeng/api';
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
  getEmployeeList:  SelectItem[] = [];
  getProjectList:  SelectItem[] = [];
  selectedEmployees: any[] = [];
  selectedProjects: any[] = [];
  TeamForm!: FormGroup;

  constructor(
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
   this.TeamForm.controls['teamEmployees'].setValue( this.team.teamEmployees.map(item => ({ value: item.id, label: item.name })) )
   this.TeamForm.controls['teamProjects'].setValue( this.team.teamProjects.map(item => ({ value: item.projectId, label: item.name })) )
   console.log(this.TeamForm.value)

  }

  fetchEmployeeList() {
    this.teamService.getSelectedEmployee().subscribe(
      (data) => {
        this.getEmployeeList = data.map(item => ({ value: item.id, label: item.name }));
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
          this.getProjectList = res.map(item => ({ value: item.id, label: item.name }))
        }
      });
  }
  onSubmit() {
    if (this.TeamForm.valid) {
      var editTeam:any={
          id: this.team.id,
          teamName:this.TeamForm.value.teamName,
          // teamEmployees:this.TeamForm.value.teamEmployees.map(item=>item.id),
          // teamProjects: this.TeamForm.value.teamProjects.map(item=>item.id)
        }
        console.log(editTeam)
        this.teamService.editTeam(editTeam).subscribe({
          next: (res) => {
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });
              this.TeamForm.reset();
              this.closeModal();
            }
            else {
              this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });
            }
  
          }, error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: err });
          }
        })
      }  else {
        this.messageService.add({ severity: 'error', summary: 'Form Submit failed.', detail: "Please fil required inputs !!" });
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