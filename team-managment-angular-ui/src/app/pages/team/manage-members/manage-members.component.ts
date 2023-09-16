import { Component, Input, OnInit, Output } from '@angular/core';
import { UserService, UserView } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem, MessageService } from 'primeng/api';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TeamService, TeamView } from 'src/app/services/team.service';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-manage-members',
  templateUrl: './manage-members.component.html',
  styleUrls: ['./manage-members.component.scss']
})
export class ManageMembersComponent implements OnInit{
  @Input() team :TeamView;
  user!: UserView;
  getEmployeeList: any[];
  selectedEmployees: any[] = [];
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
    this.TeamForm = this.formBuilder.group({
      teamName: [null, Validators.required],
      teamEmployees: [null, Validators.required],
      teamProjects: [null, Validators.required]
    })
    console.log("employee",this.getEmployeeList)
   
    console.log(this.TeamForm.value)
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
  getImage(url: string) {
    return this.commonService.createImgPath(url);
  }
  closeModal(){
    this.activeModal.close()
  }

}
