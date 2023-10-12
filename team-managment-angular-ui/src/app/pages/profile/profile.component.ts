import { Component, OnInit } from '@angular/core';
import { UserService, UserView } from 'src/app/services/user.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { CommonService } from 'src/app/services/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: UserView
  employee:any
  fileGH! : File;
  imagePath: any=null;

  constructor(
    private userService: UserService,
    private employeeService: EmployeeService,
    private commonService: CommonService,
    private modalSerivce: NgbModal,
    private messageService:MessageService
   
    
    ) {}
  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.getEmployee()
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

changePassword(){
  let modalRef= this.modalSerivce.open(ChangePasswordComponent,{size:'sl',backdrop:'static'})
  modalRef.componentInstance.userId = this.user.UserID
  modalRef.result.then(()=>{this.getEmployee()})
}
getImage2() {

  if (this.imagePath != null) {
    return this.imagePath
  }
  if (this.employee != null) {
    return this.getImage(this.employee.imagePath!)
  }
  // else {
  //   return 'assets/img/company.jpg'
  // }
}
onUpload2(event: any) {

  var file: File = event.target.files[0];
  this.fileGH = file
  
  var myReader: FileReader = new FileReader();
  myReader.onloadend = (e) => {
    this.imagePath = myReader.result;
  }
  myReader.readAsDataURL(file);
  console.log(this.fileGH)
  const formData = new FormData();
      formData.append("Id", this.employee.id)
      formData.append("Image", this.fileGH);
      

      this.employeeService.changeProfilePic(formData).subscribe({
        next: (res) => {

          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });
                    
            
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });

          }

        }, error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: err });
        }
      })

  this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
}
}
