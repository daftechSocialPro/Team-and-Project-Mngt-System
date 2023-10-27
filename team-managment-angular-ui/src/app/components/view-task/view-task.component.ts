import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { CommonService } from 'src/app/services/common.service';
import { TaskService } from 'src/app/services/task.service';
import { ViewPdfComponent } from '../view-pdf/view-pdf.component';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss']
})
export class ViewTaskComponent implements OnInit {
  @Input()  task !: any
  type: string = '';
  pdflink: string = '';
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
    private commonService: CommonService,
    private modalService: NgbModal){}
    
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
    
    getPdfFile(url: string) {
      return this.commonService.getPdf(url)
    }
    getImage(url: string) {
      return this.commonService.createImgPath(url)
    }
    getFileExtension(filename: string): string {
      const lastDotIndex = filename.lastIndexOf('.');
      if (lastDotIndex === -1) {
        return '';
      }
      return filename.substr(lastDotIndex);
    }
    isImageFile(fileUrl: string): boolean {
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
      const fileExtension = this.getFileExtension(fileUrl);
      return imageExtensions.includes(fileExtension.toLowerCase());
    }
  
    isPDFFile(fileUrl: string): boolean {
      const pdfExtensions = ['.pdf'];
      const fileExtension = this.getFileExtension(fileUrl);
      return pdfExtensions.includes(fileExtension.toLowerCase());
    }
    viewPdf(link: string,type:string) {
      let modalRef
     
      if (this.isImageFile(link)) {
        modalRef = this.modalService.open(ViewPdfComponent, {  backdrop: 'static' })
        this.pdflink = this.getImage(link);
        this.type = "image";
      }
      else{
        modalRef = this.modalService.open(ViewPdfComponent, { size:'lg', backdrop: 'static' })
        this.pdflink = this.getPdfFile(link);
        this.type = type
      }
      modalRef.componentInstance.type = this.type
      modalRef.componentInstance.pdflink = this.pdflink
    }
  }
  