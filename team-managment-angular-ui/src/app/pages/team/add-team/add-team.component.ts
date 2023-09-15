import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService, UserView } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TeamService } from 'src/app/services/team.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss']
})
export class AddTeamComponent implements OnInit {
  @Output() teamAdded = new EventEmitter<any>();

  getEmployeeList: any[];
  getProjectList: any[];
  selectedProject: any;
  user!: UserView;
  selectedEmployees: any[] = [];
  selectedProjects: any[] = [];
  uploadedFiles: any[] = [];
  TeamForm!: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private messageService: MessageService,
    private teamService: TeamService
  ) { }

  ngOnInit(): void {
    this.fetchEmployeeList();
    this.fetchProjectList();
    this.user = this.userService.getCurrentUser();

    this.TeamForm = this.formBuilder.group({
      teamName: [null, Validators.required],
      teamEmployees: [null, Validators.required],
      teamProjects: [null, Validators.required]
    });
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
          
              this.teamAdded.emit();
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

  onUpload(event: any) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded'
    });
  }

  getImage(url: string) {
    return this.commonService.createImgPath(url);
  }
}