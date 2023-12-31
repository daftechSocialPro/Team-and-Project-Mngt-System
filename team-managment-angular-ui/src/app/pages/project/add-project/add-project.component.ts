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
  uploadedFiles: any[] = [];
  
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
          ProjectName:this.ProjectForm.value.ProjectName,
          Description:this.ProjectForm.value.Description,
          AssignedDate:this.ProjectForm.value.AssignedDate,
          DueDate:this.ProjectForm.value.DueDate,
          ProjectStatus:this.ProjectForm.value.ProjectStatus.name,
          AssignedTo:this.ProjectForm.value.AssignedTo.name,
          TeamId:this.ProjectForm.value.TeamId,
          GitHubLink:this.ProjectForm.value.GitHubLink,
          CreatedById:this.user.UserID,
        }
      }
      else{
        var projectAdd:any ={
          ProjectName:this.ProjectForm.value.ProjectName,
          Description:this.ProjectForm.value.Description,
          AssignedDate:this.ProjectForm.value.AssignedDate,
          DueDate:this.ProjectForm.value.DueDate,
          ProjectStatus:this.ProjectForm.value.ProjectStatus.name,
          AssignedTo:this.ProjectForm.value.AssignedTo.name,
          //ProjectEmployees:this.employeesSelectedList,
          GitHubLink:this.ProjectForm.value.GitHubLink,
          CreatedById:this.user.UserID,
        }
      }
      var formData = new FormData();
      for (let key in projectAdd) {
        if (projectAdd.hasOwnProperty(key)) {
          formData.append(key, (projectAdd as any)[key]);
        }
      }
      for (var i = 0; i < this.employeesSelectedList.length; i++) {
        formData.append("ProjectEmployees", this.employeesSelectedList[i]);
      }
      for (var i = 0; i < this.uploadedFiles.length; i++) {
        formData.append("ProjectFiles", this.uploadedFiles[i]);
      }
      


      this.projectService.addProject(formData).subscribe({
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
  onUpload(event: any) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
  }
}
