import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectItem, MessageService } from 'primeng/api';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProjectService, ProjectView } from 'src/app/services/project.service';
import { UserView, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {
  
  @Input() projectId: string

  user : UserView
  project : ProjectView
  employeesSelectList: SelectItem[] = []
  employeesSelectedList: SelectItem[] = []
  

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
    
  ];
  selectedState: any = null;
  
  ProjectForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private projectService: ProjectService,
    private employeeService: EmployeeService,
    private activeModal: NgbActiveModal 
      
    ) { }

  ngOnInit(): void {

    this.user = this.userService.getCurrentUser()
    // this.project = this.projectService.getProject(this.projectId)
    
    this.getEmployeesSelectList()
    console.log(this.projectId)
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
    this.projectService.getProject(this.projectId).subscribe({next:(res) => {
      
      console.log(res)
      
      this.project = res
      this.ProjectForm.controls['ProjectName'].setValue(this.project.projectName )
      this.ProjectForm.controls['AssignedDate'].setValue(this.project.assignedDate.toString().split('T')[0] )
      this.ProjectForm.controls['Description'].setValue(this.project.description )
      this.ProjectForm.controls['DueDate'].setValue(this.project.dueDate.toString().split('T')[0] )
      this.ProjectForm.controls['ProjectStatus'].setValue(this.projectStatusDropdownItems.find(u => u.name === this.project.projectStatus) )
      this.ProjectForm.controls['AssignedTo'].setValue(this.assignedToDropdownItems.find(u => u.name === this.project.assignedTo) )
      this.ProjectForm.controls['ProjectEmployees'].setValue( this.project.projectEmployees.map(item => ({ value: item.id, label: item.name })) )
      this.ProjectForm.controls['GitHubLink'].setValue(this.project.gitHubLink )
      this.employeesSelectedList =  this.project.projectEmployees.map(u => u.id)
      console.log(this.employeesSelectedList)  
    }})
      
  }

  onSubmit() {
    console.log(this.ProjectForm.value)
    
    if (this.ProjectForm.valid) {
      
      var projectEdit:any ={
        id:this.project.id,
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

      console.log(projectEdit)

      this.projectService.editProject(projectEdit).subscribe({
        next: (res) => {

          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });

            this.ProjectForm.reset();
            // this.projectEdited.emit();
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
        this.employeesSelectList = res.map(item => ({ value: item.id, label: item.name }));
      }
    })
  }

  SelectItems(event: any)
  {
    this.employeesSelectedList = event.value.map(u=>u.value);
    console.log(event.value)
    
  }

  closeModal()
  {
    this.activeModal.close()
  }
  
}
