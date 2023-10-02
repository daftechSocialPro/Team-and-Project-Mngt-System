import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService, SelectItem } from 'primeng/api';
import { CommonService } from 'src/app/services/common.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { NoticeService } from 'src/app/services/notice.sercive';
import { ProjectService } from 'src/app/services/project.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService, UserView } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-notice',
  templateUrl: './add-notice.component.html',
  styleUrls: ['./add-notice.component.scss']
})
export class AddNoticeComponent implements OnInit {
  
  
  user : UserView
  employeesSelectList: SelectItem[] = []
  employeesSelectedList: string[] = []
  teamsSelectList: SelectItem[] = []
  projectSelectList: SelectItem[] = []
  noticeToDropdownItems = [
    { name: 'ALL EMPLOYEES', code: 'AE' },
    { name: 'EMPLOYEES', code: 'E' },
    { name: 'TEAM', code: 'T' },
    { name: 'PROJECT', code: 'P' }
  ]
  NoticeForm!: FormGroup;
  projectemp: any;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private projectService: ProjectService,
    private employeeService: EmployeeService,
    private teamService: TeamService,
    private commonService: CommonService,
    private activeModal: NgbActiveModal,
    private noticeService: NoticeService
    ){}
    
    
    ngOnInit(): void {
      this.user = this.userService.getCurrentUser()
      this.getProjectSelectList()
      this.getEmployeesSelectList()
      this.getTeamSelectList()
      this.NoticeForm = this.formBuilder.group({
        Subject: [null, Validators.required],
        Content: [null, Validators.required],
        NoticeTo: [null, Validators.required],
        ProjectId: [null, Validators.required],
        TeamId: [null, Validators.required],
        
      })
      
    }
    
    
    onSubmit() {
      console.log(this.NoticeForm.value)
      
      if (this.NoticeForm.valid) {
        
        
        var postNotice:any ={
          subject:this.NoticeForm.value.Subject,
          content:this.NoticeForm.value.Content,
          projectId:this.NoticeForm.value.ProjectId,
          teamId:this.NoticeForm.value.TeamId,
          employeeId:this.user.EmployeeId,
          employeeIds:this.projectemp.map(u=>u.value)
          
        }
        
        
        
        console.log(postNotice)
        
        this.noticeService.postNotice(postNotice).subscribe({
          next: (res) => {
  
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });
            }
            else {
              this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });
  
            }
  
          }, error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: err });
          }
        })
        
        
        
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Form Submit failed.', detail: "Please fil required inputs !!" });
      }
      
      
    }
    
    
    
    getEmployeesSelectList() {
      this.employeeService.getEmployeesSelectList().subscribe({
        next: (res) => {
          this.employeesSelectList = res.map(item => ({ value: item.id, label: item.name, imagePath: item.imagePath }));
        }
      })
    }
    getTeamSelectList() {
      this.teamService.getTeamSelectList().subscribe({
        next: (res) => {
          this.teamsSelectList = res.map(item => ({ value: item.id, label: item.name }));
        }
      })
    }
    getProjectSelectList(){
      this.projectService.getProjects().subscribe({
        next:(res) => {
          this.projectSelectList = res.map(i => ({value: i.id , label:i.projectName}));
        }
      })
    }
    showInput()
    {
      if (this.NoticeForm.value.NoticeTo !== null){
        return this.NoticeForm.value.NoticeTo.code
      }
      
    }
    closeModal()
    {
      this.activeModal.close()
    }
  }
  