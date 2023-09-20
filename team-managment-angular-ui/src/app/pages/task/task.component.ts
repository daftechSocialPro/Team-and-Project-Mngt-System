import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Table } from 'primeng/table';
import { forkJoin } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @ViewChild('filter') filter!: ElementRef;
  tasks: any;
  metadata: any;
  loading: boolean = true;
  constructor(
    private taskService: TaskService,
    private employeeService: EmployeeService,
    private commonService:CommonService) { }

  ngOnInit(): void {
    this.getTasks()
  }  
  getTasks() {
    this.metadata = {};
    this.taskService.getAllTask().subscribe({
      next: (res) => {
        this.tasks = res
        if (this.tasks) {
          for (let i = 0; i < this.tasks.length; i++) {
              const rowData = this.tasks[i];
              const employeeName = rowData.employeeName;
              console.log(" task.status", rowData.status)

              if (i === 0) {
                  this.metadata[employeeName] = { index: 0, size: 1 };
              }
              else {
                  const previousRowData = this.tasks[i - 1];
                  const previousRowGroup = previousRowData.employeeName;
                  if (employeeName === previousRowGroup) {
                      this.metadata[employeeName].size++;
                  }
                  else {
                      this.metadata[employeeName] = { index: i, size: 1 };
                  }
              }
          }
      }
     }
     })

     
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

 

}