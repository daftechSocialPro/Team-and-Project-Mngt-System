import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { CommonService } from 'src/app/services/common.service';
import { ComplaintService } from 'src/app/services/complaint.service';
import { UserService, UserView } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-complaint',
  templateUrl: './edit-complaint.component.html',
  styleUrls: ['./edit-complaint.component.scss']
})
export class EditComplaintComponent implements OnInit {
  
  @Input() complaint:any
  EditComplaint! : FormGroup
  user: UserView
  ComplaintStatusDropdownItems = [
    { name: 'PENDING', code: 'PENDING' },
    { name: 'INPROGRESS', code: 'INPROGRESS' },
    { name: 'ONHOLD', code: 'ONHOLD' },
    { name: 'RESOLVED', code: 'RESOLVED' },
    { name: 'REOPENED', code: 'REOPENED' },
  ]
  
  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private commonService: CommonService,
    private activeModal: NgbActiveModal,
    private complaintService: ComplaintService,
    private userService: UserService
    ){}
    
    ngOnInit(): void {
      
      this.user = this.userService.getCurrentUser()
      this.EditComplaint = this.formBuilder.group({
        
        ComplaintStatus: [null,Validators.required],
        
      })
      
      this.EditComplaint.controls['ComplaintStatus'].setValue(this.ComplaintStatusDropdownItems.find(x=>x.code === this.complaint.complaintStatus))
      
    }
    
    onSubmit(){
      if (this.EditComplaint.valid) {
        const formData = new FormData();
        formData.append("Id", this.complaint.id)
        formData.append("Description", this.complaint.description);
        formData.append("Subject", this.complaint.subject);
        formData.append("ComplaintStatus", this.EditComplaint.value.ComplaintStatus.code);
        formData.append("CreatedById", this.complaint.createdById);
        
        
        this.complaintService.editComplaint(formData).subscribe({
          next: (res) => {
            
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });
              
              this.EditComplaint.reset();
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
    
  }
  