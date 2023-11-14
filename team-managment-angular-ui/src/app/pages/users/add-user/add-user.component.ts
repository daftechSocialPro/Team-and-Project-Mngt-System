import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService, SelectItem } from 'primeng/api';
import { ClientService } from 'src/app/services/client.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { UserService, UserView } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  @Output() userAdded = new EventEmitter<any>();

  user !: UserView
  userForm !: FormGroup;
  employeesNoUsers: SelectItem[] = []
  clientssNoUsers: SelectItem[] = []
  userRoles: any[] = []
  assignedToDropdownItems = [
    { name: 'CLIENT', code: 'CLIENT' },
    { name: 'EMPLOYEE', code: 'EMPLOYEE' }]
  

  ngOnInit(): void {

    this.user = this.userService.getCurrentUser();

    this.userForm = this.formBuilder.group({
      employeeId: [null],
      clientId: [null],
      userName: [null, Validators.required],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
      roles: [null],
      userType: [null, Validators.required],
    })

    this.getEmployeeNouser()
    this.getClientNouser()
    this.getUserRoles()
  }

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private employeeService: EmployeeService,
    private messageService: MessageService,
    private activeModal: NgbActiveModal,
    private clientService : ClientService) { }

  onSubmit() {

    if (this.userForm.value.password != this.userForm.value.confirmPassword) {
      this.messageService.add({ severity: 'error', summary: 'Password Error', detail:"Password doesn't match "});
        
      return
    }
    
    if (this.userForm.valid) {
      const value = {
        clientId: this.userForm.value.clientId,
        employeeId: this.userForm.value.employeeId,
        userName: this.userForm.value.userName,
        password: this.userForm.value.password,
        roles: this.userForm.value.roles,
      }
      if(this.userForm.value.roles === null){
        value.roles = "CLIENT"
      }

      this.userService.addUser(value).subscribe({

        next: (res) => {

          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });

            this.userForm.reset();
            this.closeModal()

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

  getEmployeeNouser() {
    this.employeeService.getEmployeeNouser().subscribe({
      next: (res) => {
        this.employeesNoUsers = res.map(item => ({ value: item.id, label: item.name }));
      }
    })
  }

  getClientNouser() {
    this.clientService.getClientNouser().subscribe({
      next: (res) => {
        this.clientssNoUsers = res.map(item => ({ value: item.id, label: item.name }));
      }
    })
  }
  getUserRoles() {
    this.userService.getUserRoles().subscribe({
      next: (res) => {
        this.userRoles = res.map(item => ({ value: item.name, label: item.name }));
               
      }
    })
  }

  showInput()
  {
    if (this.userForm.value.userType !== null){
      return this.userForm.value.userType.name
    }

  }

  closeModal()
  {
    this.activeModal.close()
  }

}
