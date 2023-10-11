import { Component, OnInit } from '@angular/core';
import { UserService, UserView } from 'src/app/services/user.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { CommonService } from 'src/app/services/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditimageComponent } from './editimage/editimage.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: UserView
  employee:any

  constructor(
    private userService: UserService,
    private employeeService: EmployeeService,
    private commonService: CommonService,
    private modalSerivce: NgbModal
   
    
    ) {}
  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.  getEmployee()
  }

  getEmployee(){

    this.employeeService.getEmployee(this.user.EmployeeId).subscribe({
      next: (res) => {
       this.employee = res   
       console.log("this.employee",this.employee)
      },error: (err) => {
        console.log(err)
      }
    })
}
getImage(url: string) {
  return this.commonService.createImgPath(url)
}
editImage(employeeId){
  let modalRef= this.modalSerivce.open(EditimageComponent,{size:'sl',backdrop:'static'})
  modalRef.componentInstance.employeeId = employeeId
  modalRef.result.then(()=>{this.getEmployee()})
}
}
