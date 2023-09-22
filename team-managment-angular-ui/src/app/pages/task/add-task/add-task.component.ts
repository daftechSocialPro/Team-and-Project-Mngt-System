import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService, SelectItem } from 'primeng/api';
import { CommonService } from 'src/app/services/common.service';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';
import { UserService ,UserView } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit{
  user : UserView
  projectSelectList: SelectItem[] = []
  TaskForm : FormGroup;

  taskStatusDropDown = [
    { name: 'NOTSTARTED', code: 'NOTSTARTED' },
    { name: 'INPROGRESS', code: 'INPROGRESS' },
    { name: 'COMPLETE', code: 'COMPLETE' },
    { name: 'OVERDUE', code: 'OVERDUE' },
    { name: 'ONHOLD', code: 'ONHOLD'}
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
    private taskService:TaskService){}


  ngOnInit(): void {

    this.user = this.userService.getCurrentUser()
    this.getProjectList()

    this.TaskForm = this.formBuilder.group({
      TaskName:[null,Validators.required],
      EndDate:[null,Validators.required],
      TaskStatus:[null,Validators.required],
      TaskPriority:[null,Validators.required],
      ProjectId:[null,Validators.required],
      TaskDescription:['']
     })
    
  }
  onSubmit(){
    console.log(this.TaskForm.value)

    if(this.TaskForm.valid){
      var taskAdd:any = {
        taskName:this.TaskForm.value.TaskName,
        endDate:this.TaskForm.value.EndDate,
        taskStatuses:this.TaskForm.value.TaskStatus.name,
        taskPriority:this.TaskForm.value.TaskPriority.name,
        employeeId:this.user.EmployeeId,
        projectId:this.TaskForm.value.ProjectId.value,
        taskDescription:this.TaskForm.value.TaskDescription,
        createdById:this.user.UserID
      }
      console.log(taskAdd)

      this.taskService.addTask(taskAdd).subscribe({
        next: (res) => {

          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });

            this.TaskForm.reset();
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
    this.projectService.getProjectSelectList().subscribe({
      next: (res) => {
        this.projectSelectList = res.map(item => ({ value: item.id, label: item.name }));
      }
    })

  }
  closeModal()
  {
    this.activeModal.close()
  }

}
