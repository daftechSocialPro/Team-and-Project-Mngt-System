import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { EmployeeService } from 'src/app/services/employee.service';
import { UserView, UserService } from 'src/app/services/user.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-editimage',
  templateUrl: './editimage.component.html',
  styleUrls: ['./editimage.component.scss']
})
export class EditimageComponent implements OnInit {
  @Input() employeeId: string
  imagePath: any=null;
  user !: UserView
  employee:any
  uploadedFiles: any[] = [];
  ImageForm!: FormGroup;
  fileGH! : File;
  
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private employeeService: EmployeeService,
    private activeModal: NgbActiveModal,
    private commonService: CommonService) { }
  ngOnInit(): void {
    this.ImageForm = this.formBuilder.group({
    
    })
    this.employeeService.getEmployee(this.employeeId).subscribe({next:(res) => {
      this.employee = res
      
      this.uploadedFiles.push()
      
      
    }})

  }
  onSubmit() {
    console.log(this.ImageForm.value)
    console.log(this.uploadedFiles)
    if (this.ImageForm.valid) {
      debugger
      const formData = new FormData();
      formData.append("Id", this.employee.id)
      formData.append("Image", this.fileGH);
      formData.append("CreatedById", this.user.UserID);

      this.employeeService.editEmployee(formData).subscribe({
        next: (res) => {

          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });

            this.ImageForm.reset();
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
      this.messageService.add({ severity: 'error', summary: 'Form Submit failed.', detail: "Please fil required inputs !!" });
    }


  }
  closeModal()
  {
    this.activeModal.close()
  }
  getImage (url:string){

    return this.commonService.createImgPath(url)
  }
  getImage2() {

    if (this.imagePath != null) {
      return this.imagePath
    }
    if (this.employee != null) {
      return this.getImage(this.employee.imagePath!)
    }
    else {
      return 'assets/img/company.jpg'
    }
  }
  onUpload2(event: any) {

    var file: File = event.target.files[0];
    this.fileGH = file
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.imagePath = myReader.result;
    }
    myReader.readAsDataURL(file);
  }

}
