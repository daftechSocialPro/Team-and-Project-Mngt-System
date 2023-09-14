import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CommonService } from 'src/app/services/common.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { UserService, UserView } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  @Output() employeeAdded = new EventEmitter<any>();

  user !: UserView
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
    private employeeService: EmployeeService) { }

  ngOnInit(): void {

    this.user = this.userService.getCurrentUser()

    console.log(this.user)
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
  }

  onSubmit() {
    console.log(this.EmployeeForm.value)
    console.log(this.uploadedFiles)
    if (this.EmployeeForm.valid) {

      const formData = new FormData();
      formData.append("FirstName", this.EmployeeForm.value.FirstName);
      formData.append("LastName", this.EmployeeForm.value.LastName);
      formData.append("Gender", this.EmployeeForm.value.Gender.name);
      formData.append("PhoneNumber", this.EmployeeForm.value.PhoneNumber);
      formData.append("BirthDate", this.EmployeeForm.value.BirthDate);
      formData.append("Email", this.EmployeeForm.value.Email);
      formData.append("Address", this.EmployeeForm.value.Address);
      formData.append("EmploymentDate", this.EmployeeForm.value.EmploymentDate);
      formData.append("EmploymentPosition", this.EmployeeForm.value.EmploymentPosition.name);
      formData.append("ImagePath", this.uploadedFiles[0]);
      formData.append("CreatedById", this.user.UserID);

      this.employeeService.addEmployee(formData).subscribe({
        next: (res) => {

          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });

            this.EmployeeForm.reset();
            this.uploadedFiles = []
            this.employeeAdded.emit();
            // this.closeModal();
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
    console.log(event)
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
  }

}
