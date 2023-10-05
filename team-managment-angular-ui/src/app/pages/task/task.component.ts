import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Table } from 'primeng/table';
import { CommonService } from 'src/app/services/common.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { TaskService } from 'src/app/services/task.service';
import { UserService, UserView } from 'src/app/services/user.service';
import { AddTaskComponent } from './add-task/add-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { MessageService } from 'primeng/api';

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
  taskproject:any;
  selectedValue:string = 'AT'
  dropdownOptions = [
    { label: 'All Tasks', value: 'AT' },
    { label: 'My Tasks', value: 'MT' }
    
  ];
  
  
  constructor(
    private taskService: TaskService,
    private messageService:MessageService,
    private employeeService: EmployeeService,
    private commonService:CommonService,
    private userService:UserService,
    private modalSerivce: NgbModal) { }
    
    ngOnInit(): void {
      this.user = this.userService.getCurrentUser()
      this.getTasks()
      this.getEmployeeTask(this.user.EmployeeId)
    }  
    getEmployeeTask(id) {
      this.taskService.getTask(id).subscribe({
        next: (res) => {
          this.employeeTask = res;
          this.taskArray = [];
          console.log(this.taskArray,"taskaaaaa")
          this.employeeTask.forEach((item) => {
            this.taskArray.push(item);
          });
          this.taskArray.forEach((task) => {
            this.checkTaskOverdue(task);
            
          });
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
    checkTaskOverdue(task) {
      const endDate = new Date(task.endDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
    }
    
    isTaskOverdue(endDate: Date): boolean {
      const endDateObj = new Date(endDate);
      const todayObj = new Date();
      endDateObj.setHours(0, 0, 0, 0);
      todayObj.setHours(0, 0, 0, 0);
      return endDateObj < todayObj;
    }
    
    
    getTasks() {
      this.taskService.getAllTask().subscribe({
        next: (res) => {
          this.tasks = res;
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
    
    filterdTask(status:string){
      return this.taskArray.filter(m=>m.taskStatuses == status)
    }
    getImage(url: string) {
      return this.commonService.createImgPath(url)
    }
    getFile(url: string) {
      return this.commonService.getPdf(url)
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
    onDrop(event: any, status: string) {
      console.log("onDrop");
      event.preventDefault();
      const record = this.taskArray.find(m => m.id == this.curentTask.id);
      if (record !== undefined) {
        record.taskStatuses = status;
        console.log(record.id, status, "sending data");
        
        
        const data = {
          id: record.id,
          taskStatuses: status,
          isOnHold: record.isOnHold,
          taskApproval:this.curentTask.taskApproval
          
        };
        
        
        this.taskService.updateStatus(data).subscribe({
          next: (res) => {
            console.log("Task status updated successfully:", res);
          },
          error: (err) => {
            console.log("Error updating task status:", err);
          }
        });
      }
      this.curentTask = null;
    }
    onSwitchToggled(event:any,item:any) {
      let checked=event.checked;
      const data = {
        id: item.id,
        taskStatuses: item.taskStatuses,
        isOnHold: checked
      };
      
      this.taskService.updateStatus(data).subscribe({
        next: (res) => {
          this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });
          
          // console.log("Task status updated successfully:", res);
        },
        error: (err) => {
          console.log("Error updating task status:", err);
        }
      });
    }
    
    getStyleee(item:any){
      
      if(item.isOnHold)
      return 'bg-warning'
      
      
      
      if(!item.isOnHold && this.isTaskOverdue(item.endDate))
      
      return 'bg-red'
      
      return ''
    }
    
    dragOver(event:any){
      event.preventDefault();
      console.log("dragOver")
    }
    
    
  }
  interface expandedRows {
    [key: string]: boolean;
  }