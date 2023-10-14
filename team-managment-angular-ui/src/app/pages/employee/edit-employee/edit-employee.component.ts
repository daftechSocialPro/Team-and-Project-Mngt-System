import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { EmployeeService } from 'src/app/services/employee.service';
import { UserView, UserService } from 'src/app/services/user.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {

  @Input() employeeId: string

  imagePath: any=null;
  user !: UserView
  employee:any
  fileGH! : File;
  genderDropdownItems = [
    { name: '', code: '' },
    { name: 'MALE', code: 'MALE' },
    { name: 'FEMALE', code: 'FEMALE' }]
  positionDropdownItems = [
    { name: '', code: '' },
    { name: 'DEPUTY_MANAGER', code: 'DEPUTY_MANAGER' },
    { name: 'HRM', code: 'HRM' },
    { name: 'FINANCE', code: 'FINANCE' },
    { name: 'MARKETING', code: 'MARKETING' },
    { name: 'DEVELOPER', code: 'DEVELOPER' },
  ];
  selectedState: any = null;
  uploadedFiles: any[] = [];
  EmployeeForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private employeeService: EmployeeService,
    private activeModal: NgbActiveModal,
    private commonService: CommonService) { }

  ngOnInit(): void {

    this.user = this.userService.getCurrentUser()

    this.EmployeeForm = this.formBuilder.group({
      FirstName: [null, Validators.required],
      LastName: [null, Validators.required],
      Gender: [null, Validators.required],
      PhoneNumber: [null, Validators.required],
      BirthDate: [null, Validators.required],
      Email: [null, Validators.required],
      Address: ['', Validators.required],
      EmploymentDate: ['', Validators.required],
      EmploymentPosition: ['', Validators.required]
    })
    this.employeeService.getEmployee(this.employeeId).subscribe({next:(res) => {
      
      
      this.employee = res
      this.EmployeeForm.controls['FirstName'].setValue(this.employee.firstName )
      this.EmployeeForm.controls['LastName'].setValue(this.employee.lastName)
      this.EmployeeForm.controls['Gender'].setValue(this.genderDropdownItems.find(u => u.name === this.employee.gender))
      this.EmployeeForm.controls['PhoneNumber'].setValue(this.employee.phoneNumber)
      this.EmployeeForm.controls['BirthDate'].setValue(this.employee.birthDate.split('T')[0])
      this.EmployeeForm.controls['Email'].setValue(this.employee.email)
      this.EmployeeForm.controls['Address'].setValue(this.employee.address)
      this.EmployeeForm.controls['EmploymentDate'].setValue(this.employee.employmentDate.split('T')[0])
      this.EmployeeForm.controls['EmploymentPosition'].setValue(this.positionDropdownItems.find(u => u.name === this.employee.employmentPosition))
      this.uploadedFiles.push()
      
      
    }})
  }

  onSubmit() {
    if (this.EmployeeForm.valid) {
      debugger
      const formData = new FormData();
      formData.append("Id", this.employee.id)
      formData.append("FirstName", this.EmployeeForm.value.FirstName);
      formData.append("LastName", this.EmployeeForm.value.LastName);
      formData.append("Gender", this.EmployeeForm.value.Gender.name);
      formData.append("PhoneNumber", this.EmployeeForm.value.PhoneNumber);
      formData.append("BirthDate", this.EmployeeForm.value.BirthDate);
      formData.append("Email", this.EmployeeForm.value.Email);
      formData.append("Address", this.EmployeeForm.value.Address);
      formData.append("EmploymentDate", this.EmployeeForm.value.EmploymentDate);
      formData.append("EmploymentPosition", this.EmployeeForm.value.EmploymentPosition.name);
      formData.append("Image", this.fileGH);
      formData.append("CreatedById", this.user.UserID);

      this.employeeService.editEmployee(formData).subscribe({
        next: (res) => {

          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });

            this.EmployeeForm.reset();
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
  onUpload(event: any) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
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
