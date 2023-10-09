import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { CommonService } from 'src/app/services/common.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss']
})
export class ViewTaskComponent implements OnInit {
  @Input()  task !: any
  taskApprovalDropDown = [
    { name: 'PENDING', code: 'PENDING'},
    { name: 'APPROVED', code: 'APPROVED'},
    { name: 'REJECTED', code: 'REJECTED'}
  ]
  TaskApprovalForm!: FormGroup;
  constructor(private activeModal :NgbActiveModal,
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private messageService: MessageService,
    private commonService: CommonService){}
    
    ngOnInit(): void {
      console.log(this.task)
      this.TaskApprovalForm = this.formBuilder.group({
        TaskApproval: [null, Validators.required],
        RejectionRemark: [null]
      })
      this.TaskApprovalForm.controls['TaskApproval'].setValue(this.taskApprovalDropDown.find(u => u.name === this.task.taskApproval) )
      
    }
    
    closeModal(){
      this.activeModal.close()
    }
    showInput()
    {
      return this.TaskApprovalForm.value.TaskApproval.name
      
    }
    onSubmit() {
      
      
      if (this.TaskApprovalForm.valid) {
        
        var taskApproval:any ={
          id:this.task.id,
          taskStatuses:this.task.taskStatuses,
          taskApproval: this.TaskApprovalForm.value.TaskApproval.name ,
          rejectionRemark: this.TaskApprovalForm.value.RejectionRemark
        }
        
        this.taskService.updateStatus(taskApproval).subscribe({
          next: (res) => {
            
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });
              
              this.TaskApprovalForm.reset();
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
    getImage(url: string) {
      return this.commonService.createImgPath(url)
    }
  }
  