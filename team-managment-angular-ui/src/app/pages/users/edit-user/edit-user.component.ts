import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { UserService, UserView } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  user: UserView
  @Input() user1: any
  showFields: boolean = false;
  
  editUserForm!: FormGroup
  statusDropdownItems = [
    { name: 'ACTIVE', code: 'ACTIVE' },
    { name: 'INACTIVE', code: 'INACTIVE' },
  ]
  
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private messageService: MessageService
    
    ){}
    
    ngOnInit(): void {
      
      this.user = this.userService.getCurrentUser()
      this.editUserForm = this.formBuilder.group({
        Username: [null, Validators.required],
        UserStatus: [null, Validators.required],
        NewPassword: [null],
        ConfirmPassword: [null],
        
      })
      
      this.editUserForm.controls['Username'].setValue(this.user1.userName)
      this.editUserForm.controls['UserStatus'].setValue(this.statusDropdownItems.find(x => x.code === this.user1.status))
      
    }
    
    onSubmit(){
      debugger
      if (this.editUserForm.valid) {
        var userData:any = {
          userId: this.user1.id,
          userName:this.editUserForm.value.Username,
          rowStatus:this.editUserForm.value.UserStatus.name,
          changePassword : null
        }
        
        
        if (this.editUserForm.value.NewPassword !== null && (this.editUserForm.value.NewPassword === this.editUserForm.value.ConfirmPassword))
        {
          userData.changePassword = this.editUserForm.value.NewPassword
        }
        else if(this.editUserForm.value.NewPassword !== this.editUserForm.value.ConfirmPassword){
          
          this.messageService.add({ severity: 'error', summary: 'Form Submit failed.', detail: "New Password and Confirm Password does not match" });
          
        }
        
        
        this.userService.updateUser(userData).subscribe({
          next: (res) => {
            
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });
              
              this.editUserForm.reset();
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
    }
    
    closeModal()
    {
      this.activeModal.close()
    }
  }
  