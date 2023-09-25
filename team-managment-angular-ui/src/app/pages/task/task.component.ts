import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Table } from 'primeng/table';
import { CommonService } from 'src/app/services/common.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { TaskService } from 'src/app/services/task.service';
import { UserService, UserView } from 'src/app/services/user.service';
import { AddTaskComponent } from './add-task/add-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @ViewChild('filter') filter!: ElementRef;
  tasks: any
  user :UserView
  loading: boolean = true;
  expandedRows: expandedRows = {};
  isExpanded: boolean = false;
  employeeTask: any;
  taskArray:any = [];
  curentTask:any;

  constructor(
    private taskService: TaskService,
    private employeeService: EmployeeService,
    private commonService:CommonService,
    private userService:UserService,
    private modalSerivce: NgbModal) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.getTasks()
    this.getEmployeeTask(this.user.EmployeeId)
  }  

  getEmployeeTask(id){
    this.taskService.getTask(id).subscribe({
      next: (res) => {
        this.employeeTask = res;
        console.log("Employee Tasks",this.employeeTask)
      },
      error:(err) => {
        console.log(err)
      }
    })
  }

  getTasks() {
 
    this.taskService.getAllTask().subscribe({
      next: (res) => {
        this.tasks = res;
        console.log("Tasks:", this.tasks);
        this.tasks.forEach((item) => {
          item.tasks.forEach((task) => {
            this.taskArray.push(task);
          });
        });
        console.log("TaskArray:", this.taskArray);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  filterdTask(status:string){
     return this.taskArray.filter(m=>m.taskStatuses == status)
  }
  filterdTaskArr(statuses: string[]) {
    return this.taskArray.filter(m => statuses.includes(m.taskStatuses));
  }

  getImage(url: string) {
    return this.commonService.createImgPath(url)
  }
  
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }
  allowedRoles(allowedRoles: any)
  {
    return this.userService.roleMatch(allowedRoles)
  }
  addTask()
  {
    let modalRef= this.modalSerivce.open(AddTaskComponent,{size:'xl',backdrop:'static'})
    modalRef.result.then(()=>{this.getEmployeeTask(this.user.EmployeeId)})
  }
  editTask(taskId)
  {
    let modalRef= this.modalSerivce.open(EditTaskComponent,{size:'xl',backdrop:'static'})
    modalRef.componentInstance.taskId = taskId
    modalRef.result.then(()=>{this.getEmployeeTask(this.user.EmployeeId)})
  }
  onDragStart(item:any){
    this.curentTask=item;
    console.log("onDragStart")

  }
  onDrop(event:any, status:string){
    console.log("onDrop")
    event.preventDefault();
    const record=this.taskArray.find(m=>m.id == this.curentTask.id)
    if(record != undefined){
      record.taskStatuses = status;
      console.log(record.id,status,"sending data")
     let data={
        "id":record.id,
        "taskStatuses":status
      }
      this.taskService.updateStatus(data).subscribe({
        next: (res) => {
          console.log("Task status updated successfully:", res);
        },
        error: (err) => {
          console.log("Error updating task status:", err);
        }
      });
    }
    this.curentTask=null;
  }
  dragOver(event:any){
  event.preventDefault();
  console.log("dragOver")
  }
  

}
interface expandedRows {
  [key: string]: boolean;
}