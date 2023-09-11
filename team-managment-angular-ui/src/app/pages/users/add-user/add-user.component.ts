import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
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
  userRoles: SelectItem[] = []
  selectedList

  ngOnInit(): void {

    this.user = this.userService.getCurrentUser();

    this.userForm = this.formBuilder.group({
      employeeId: [null, Validators.required],
      userName: [null, Validators.required],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
      roles: [null, Validators.required],
    })

    this.getEmployeeNouser()
    this.getUserRoles()
  }

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private employeeService: EmployeeService,
    private messageService: MessageService) { }

  onSubmit() {

    if (this.userForm.value.password != this.userForm.value.confirmPassword) {
      this.messageService.add({ severity: 'error', summary: 'Password Error', detail:"password don't much "});
        
      return
    }
    if (this.userForm.valid) {
      const value = {
        employeeId: this.userForm.value.employeeId,
        userName: this.userForm.value.userName,
        password: this.userForm.value.password,
        roles: this.userForm.value.roles,
      }
      this.userService.addUser(value).subscribe({

        next: (res) => {

          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });

            this.userForm.reset();
            this.userAdded.emit();

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

  getUserRoles() {
    this.userService.getUserRoles().subscribe({
      next: (res) => {
        this.userRoles = res.map(item => ({ value: item.name, label: item.name }));
      }
    })
  }



}
