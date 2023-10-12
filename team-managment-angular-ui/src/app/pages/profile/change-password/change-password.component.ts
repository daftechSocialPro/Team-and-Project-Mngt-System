import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  
  @Input() userId: string
  PasswordForm!: FormGroup;
  constructor(private userService: UserService,
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private messageService: MessageService ){}
    
    ngOnInit(): void {
      this.PasswordForm = this.formBuilder.group({
        CurrentPassword: [null, Validators.required],
        NewPassword: [null, Validators.required],
        ConfirmPassword: [null, Validators.required]
      },)
    }
    
    onSubmit(){
      console.log(this.PasswordForm.value)
      if (this.PasswordForm.valid) {
        if(this.PasswordForm.value.NewPassword !== this.PasswordForm.value.ConfirmPassword)
        {
          this.messageService.add({ severity: 'error', summary: 'Form Submit failed.', detail: "New Password and Confirm Password does not match" });
        }
        else {
          
            var changePassword:any ={
              userId:this.userId,
              currentPassword:this.PasswordForm.value.CurrentPassword,
              newPassword:this.PasswordForm.value.NewPassword,
              
            }
            
            
            console.log(changePassword)
            
            this.userService.changePassword(changePassword).subscribe({
              next: (res) => {
                
                if (res.success) {
                  this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });
                  
                  this.PasswordForm.reset();
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
      else {
        this.messageService.add({ severity: 'error', summary: 'Form Submit failed.', detail: "Please fil required inputs !!" });
      }
    }
    closeModal()
    {
      this.activeModal.close()
    }
  }
  