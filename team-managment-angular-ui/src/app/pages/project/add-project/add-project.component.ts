import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { CommonService } from 'src/app/services/common.service';
import { ProjectService } from 'src/app/services/project.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { UserService, UserView } from 'src/app/services/user.service';
import { TeamService } from 'src/app/services/team.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {
  
  user : UserView
  employeesSelectList: SelectItem[] = []
  employeesSelectedList: string[] = []
  teamsSelectList: SelectItem[] = []

  assignedToDropdownItems = [
    { name: '', code: '' },
    { name: 'TEAM', code: 'TEAM' },
    { name: 'EMPLOYEE', code: 'EMPLOYEE' }]
  projectStatusDropdownItems = [
    { name: '', code: '' },
    { name: 'PENDING', code: 'PENDING' },
    { name: 'ONGOING', code: 'ONGOING' },
    { name: 'COMPLETED', code: 'COMPLETED' },
    { name: 'CANCELD', code: 'CANCELD' },
    
  ]
  selectedState: any = null;
  
  ProjectForm!: FormGroup;
  

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private projectService: ProjectService,
    private employeeService: EmployeeService,
    private teamService: TeamService,
    private commonService: CommonService,
    private activeModal: NgbActiveModal
    
    ) { }

  ngOnInit(): void {

    this.user = this.userService.getCurrentUser()
    this.getEmployeesSelectList()
    this.getTeamSelectList()
    this.ProjectForm = this.formBuilder.group({
      ProjectName: [null, Validators.required],
      Description: [null, Validators.required],
      AssignedDate: [null, Validators.required],
      DueDate: [null, Validators.required],
      ProjectStatus: [null, Validators.required],
      AssignedTo: [null, Validators.required],
      TeamId: [''],
      ProjectEmployees: [''],
      GitHubLink: [''],
      
    
    })
  }

  onSubmit() {
    
    if (this.ProjectForm.valid) {
      
      if(this.ProjectForm.value.TeamId !== undefined)
        {
        var projectAdd:any ={
          projectName:this.ProjectForm.value.ProjectName,
          description:this.ProjectForm.value.Description,
          assignedDate:this.ProjectForm.value.AssignedDate,
          dueDate:this.ProjectForm.value.DueDate,
          projectStatus:this.ProjectForm.value.ProjectStatus.name,
          assignedTo:this.ProjectForm.value.AssignedTo.name,
          teamId:this.ProjectForm.value.TeamId.value,
          projectEmployees:this.employeesSelectedList,
          gitHubLink:this.ProjectForm.value.GitHubLink,
          createdById:this.user.UserID,
        }
      }
      else{
        var projectAdd:any ={
          projectName:this.ProjectForm.value.ProjectName,
          description:this.ProjectForm.value.Description,
          assignedDate:this.ProjectForm.value.AssignedDate,
          dueDate:this.ProjectForm.value.DueDate,
          projectStatus:this.ProjectForm.value.ProjectStatus.name,
          assignedTo:this.ProjectForm.value.AssignedTo.name,
          projectEmployees:this.employeesSelectedList,
          gitHubLink:this.ProjectForm.value.GitHubLink,
          createdById:this.user.UserID,
        }
      }


      this.projectService.addProject(projectAdd).subscribe({
        next: (res) => {

          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });

            this.ProjectForm.reset();
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
  SelectItems(event: any)
  {
    
    this.employeesSelectedList = event.value.map(item => (item.value))
  
  }
  
  showInput()
  {
    if (this.ProjectForm.value.AssignedTo !== null){
      return this.ProjectForm.value.AssignedTo.name
    }

  }
  closeModal()
  {
    this.activeModal.close()
  }
  getImage(url: string) {
    return this.commonService.createImgPath(url)
  }
}
