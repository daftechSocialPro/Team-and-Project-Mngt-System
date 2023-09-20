import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Table } from 'primeng/table';
import { CommonService } from 'src/app/services/common.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {


  employees: any
  loading: boolean = true;
  visible: boolean = false;

  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private employeeService: EmployeeService,
    private commonService: CommonService,
    private modalSerivce: NgbModal) { }

  ngOnInit(): void {
    this.getEmployees()
  }

  getEmployees() {

    this.employeeService.getEmployees().subscribe({
      next: (res) => {
        this.employees = res
        this.loading = false
      }, error: (err) => {
        console.log(err)
      }

    })
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }
  getImage(url: string) {
    return this.commonService.createImgPath(url)
  }
  addEmployee() {

    this.visible = true

  }
  onEmployeeAdded(event: any) {
    
    this.visible = false;
    this.getEmployees()
  }
  editEmployee(employeeId){
    let modalRef= this.modalSerivce.open(EditEmployeeComponent,{size:'xl',backdrop:'static'})
    modalRef.componentInstance.employeeId = employeeId
    modalRef.result.then(()=>{this.getEmployees()})
  }
}

