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
  loading: boolean = true;
  expandedRows: expandedRows = {};
  isExpanded: boolean = false;
  constructor(
    private taskService: TaskService,
    private employeeService: EmployeeService,
    private commonService:CommonService) { }

  ngOnInit(): void {
    this.getTasks()
  }  

  getTasks() {
    this.taskService.getAllTask().subscribe({
      next: (res) => {
        this.tasks = res;
        console.log("Tasks:", this.tasks);
        for (const task of this.tasks) {
          console.log("Employee Name:", task.employee.name);
          console.log("Employee Image Path:", task.employee.imagePath);
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
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
interface expandedRows {
  [key: string]: boolean;
}