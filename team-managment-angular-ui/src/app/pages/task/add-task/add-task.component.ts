import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService, SelectItem } from 'primeng/api';
import { CommonService } from 'src/app/services/common.service';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService ,UserView } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit{
  @Input() projectId: string
  @Input() teamProject: any
  @Input() projectEmployees: any
  user : UserView
  projectSelectList: SelectItem[] = []
  employeeSelectList: SelectItem[] =[]
  TaskForm : FormGroup;
  uploadedFiles: any[] = [];
  selectedValue:string 
  dropdownOptions = [
    { label: 'Project Task', value: 'PT' },
    { label: 'Personal Task', value: 'PET' }
    
  ];

  taskStatusDropDown = [
    { name: 'NOTSTARTED', code: 'NOTSTARTED' },
    { name: 'INPROGRESS', code: 'INPROGRESS' },
    { name: 'COMPLETE', code: 'COMPLETE' }
    
  ]
  taskPriorityDropDown = [
    
    { name: 'LOW', code: 'LOW'},
    { name: 'MEDIUM', code: 'MEDIUM'},
    { name: 'HIGH', code: 'HIGH'}
  ]

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private projectService: ProjectService,
    private commonService: CommonService,
    private activeModal: NgbActiveModal,
    private taskService:TaskService,
    private teamService:TeamService){}


  ngOnInit(): void {
    
    this.user = this.userService.getCurrentUser()
    
    if (this.projectId === undefined){
      this.getProjectList()
      this.TaskForm = this.formBuilder.group({
      
        TaskName:[null,Validators.required],
        EndDate:[null,Validators.required],
        TaskStatus:[null,Validators.required],
        TaskPriority:[null,Validators.required],
        ProjectId:[null],
        TaskDescription:[''],
        TasKType:[null,Validators.required]
      })
    }
    else{
      this.getEmployeeList()
      this.TaskForm = this.formBuilder.group({
      
        TaskName:[null,Validators.required],
        EndDate:[null,Validators.required],
        TaskStatus:[null,Validators.required],
        TaskPriority:[null,Validators.required],
        EmployeeId:[null],
        TaskDescription:[''],
        
      })
    }
    
  }

  onSubmit(){
    
    if(this.TaskForm.valid){
      if (this.TaskForm.value.ProjectId === null){
        var taskAdd:any = {
          TaskName:this.TaskForm.value.TaskName,
          EndDate:this.TaskForm.value.EndDate,
          TaskStatuses:this.TaskForm.value.TaskStatus.name,
          TaskPriority:this.TaskForm.value.TaskPriority.name,
          EmployeeId:this.user.EmployeeId,
          TaskDescription:this.TaskForm.value.TaskDescription,
          CreatedById:this.user.UserID,
          EmployeeName:this.user.FullName,
          

        }
      }
      else if (this.projectId === undefined){
        var taskAdd:any = {
          TaskName:this.TaskForm.value.TaskName,
          EndDate:this.TaskForm.value.EndDate,
          TaskStatuses:this.TaskForm.value.TaskStatus.name,
          TaskPriority:this.TaskForm.value.TaskPriority.name,
          EmployeeId:this.user.EmployeeId,
          ProjectId:this.TaskForm.value.ProjectId.value,
          TaskDescription:this.TaskForm.value.TaskDescription,
          CreatedById:this.user.UserID,
          EmployeeName:this.user.FullName,
          ProjectName:this.TaskForm.value.ProjectId.label

        }
      
      }
      else if (this.allowedRoles(["Admin"])){
        var taskAdd:any = {
          TaskName:this.TaskForm.value.TaskName,
          EndDate:this.TaskForm.value.EndDate,
          TaskStatuses:this.TaskForm.value.TaskStatus.name,
          TaskPriority:this.TaskForm.value.TaskPriority.name,
          EmployeeId:this.TaskForm.value.EmployeeId.value,
          ProjectId:this.projectId,
          TaskDescription:this.TaskForm.value.TaskDescription,
          CreatedById:this.user.UserID,
          EmployeeName:this.TaskForm.value.EmployeeId.label
        }            
      }
      else{
        var taskAdd:any = {
          TaskName:this.TaskForm.value.TaskName,
          EndDate:this.TaskForm.value.EndDate,
          TaskStatuses:this.TaskForm.value.TaskStatus.name,
          TaskPriority:this.TaskForm.value.TaskPriority.name,
          EmployeeId:this.user.EmployeeId,
          ProjectId:this.projectId,
          TaskDescription:this.TaskForm.value.TaskDescription,
          CreatedById:this.user.UserID,
          EmployeeName:this.user.FullName
        }

      }
      var formData = new FormData();
      for (let key in taskAdd) {
        if (taskAdd.hasOwnProperty(key)) {
          formData.append(key, (taskAdd as any)[key]);
        }
      }
      for (var i = 0; i < this.uploadedFiles.length; i++) {
        formData.append("TaskFiles", this.uploadedFiles[i]);
      }
      

      this.taskService.addTask(formData).subscribe({
        next: (res) => {

          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });

            this.TaskForm.reset();
            this.uploadedFiles = []
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
      this.messageService.add({ severity: 'error', summary: 'Form Submit failed.', detail: "Please fill required inputs!!" });
    }

  }
  getProjectList(){
    
    this.projectService.getEmployeesProject(this.user.EmployeeId).subscribe({
      next: (res) => {
        this.projectSelectList = res.map(item => ({ value: item.id, label: item.projectName }));
      }
    })

  }

  getEmployeeList(){
    if (this.teamProject.length === 0){
      this.employeeSelectList = this.projectEmployees.map(i => ({ value:i.id, label:i.name}))
    }
    else {
      this.teamService.getTeamMembersSelectList(this.teamProject.map(i => i.id)).subscribe({
        next: (res) => {
          this.employeeSelectList = res.map(i => ({value: i.id, label: i.name}))
        }
      })
    }
  }

  closeModal()
  {
    this.activeModal.close()
  }

  allowedRoles(allowedRoles: any)
  {
    return this.userService.roleMatch(allowedRoles)
  }
  onUpload(event: any) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
  }
  showInput()
  {
    if (this.TaskForm.value.TasKType !== null){

      return this.TaskForm.value.TasKType.value
    }
    

  }
}
