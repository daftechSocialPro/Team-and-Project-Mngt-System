import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService, SelectItem } from 'primeng/api';
import { CommonService } from 'src/app/services/common.service';
import { ComplaintService } from 'src/app/services/complaint.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService, UserView } from 'src/app/services/user.service';

@Component({
  selector: 'app-assign-complaint',
  templateUrl: './assign-complaint.component.html',
  styleUrls: ['./assign-complaint.component.scss']
})
export class AssignComplaintComponent implements OnInit {
  
  @Input() complaint:any
  taskPriorityDropDown = [
    
    { name: 'LOW', code: 'LOW'},
    { name: 'MEDIUM', code: 'MEDIUM'},
    { name: 'HIGH', code: 'HIGH'}
  ]
  employeeSelectList: SelectItem[] =[]
  employeesSelectedList: string[] = []
  teamId:string = ''
  AssignForm!: FormGroup
  user: UserView
  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private commonService: CommonService,
    private activeModal: NgbActiveModal,
    private complaintService: ComplaintService,
    private teamService: TeamService,
    private userService: UserService
    ){}
    
    ngOnInit(): void {
      this.user = this.userService.getCurrentUser()
      this.getEmployeeList()
      this.AssignForm = this.formBuilder.group({
        EndDate: [null, Validators.required],
        TaskPriority: [null, Validators.required],
        Employees: [''],
      })
      
    }
    
    onSubmit() {
      
      if (this.AssignForm.valid) {
        
        
        var assignComplaint:any ={
          complaint:this.complaint,
          endDate:this.AssignForm.value.EndDate,
          taskPriority:this.AssignForm.value.TaskPriority.name,
          employeeId:this.employeesSelectedList,
          createdById:this.user.UserID
          
        }
        
        this.complaintService.assignComplaint(assignComplaint).subscribe({
          next: (res) => {
            
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });
              
              this.AssignForm.reset();
              this.closeModal();
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
    
    getEmployeeList(){
      if (this.complaint.project.teamProjects.length === 0){
        this.employeeSelectList = this.complaint.project.projectEmployees.map(i => ({ value:i.id, label:i.name , imagePath: i.imagePath}))
      }
      else {
        this.teamService.getTeamMembersSelectList(this.complaint.project.teamProjects.map(i => i.id)).subscribe({
          next: (res) => {
            this.employeeSelectList = res.map(i => ({value: i.id, label: i.name, imagePath: i.imagePath}))
          }
        })
      }
      
    }
    
    SelectItems(event: any)
    {
      
      this.employeesSelectedList = event.value.map(item => (item.value))
      
    }
    
    closeModal()
    {
      this.activeModal.close()
    }
    
    getImage(url: string) {
      return this.commonService.createImgPath(url)
    }
  }
  