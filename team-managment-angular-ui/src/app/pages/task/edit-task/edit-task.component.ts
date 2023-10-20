import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService, SelectItem } from 'primeng/api';
import { ViewPdfComponent } from 'src/app/components/view-pdf/view-pdf.component';
import { CommonService } from 'src/app/services/common.service';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';
import { UserService, UserView } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  @Input() taskId: string
  filePath: any=null;
  user : UserView
  projectSelectList: SelectItem[] = []
  TaskForm : FormGroup;
  fileGH! : File;
  uploadedFiles: any[] = [];
  taskStatusDropDown = [
    { name: 'NOTSTARTED', code: 'NOTSTARTED' },
    { name: 'INPROGRESS', code: 'INPROGRESS' },
    { name: 'COMPLETE', code: 'COMPLETE' }
    
  ]
  taskPriorityDropDown = [
    { name: 'LOW', code: 'LOW'},
    { name: 'MEDIUM', code: 'MEDIUM'},
    { name: 'HIGH', code: 'HIGH'}
  ]
  task: any;
  type: string = '';
  pdflink: string = '';
  
  constructor(private userService: UserService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private projectService: ProjectService,
    private commonService: CommonService,
    private activeModal: NgbActiveModal,
    private taskService:TaskService,
    private modalService: NgbModal ){}
  
  ngOnInit(): void {
    
    this.user = this.userService.getCurrentUser()
    this.getProjectList()

    this.TaskForm = this.formBuilder.group({
      TaskName:[null,Validators.required],
      EndDate:[null,Validators.required],
      TaskStatus:[null,Validators.required],
      TaskPriority:[null,Validators.required],
      ProjectId:[null],
      TaskDescription:['']
     })

     this.taskService.getSingleTask(this.taskId).subscribe({next:(res)=> 
      {
        
        this.task = res
        console.log('task: ', this.task);
        
        this.TaskForm.controls['TaskName'].setValue(this.task.taskName)
        this.TaskForm.controls['EndDate'].setValue(this.task.endDate.toString().split('T')[0])
        this.TaskForm.controls['TaskStatus'].setValue(this.taskStatusDropDown.find(u => u.name === this.task.taskStatuses))
        this.TaskForm.controls['TaskPriority'].setValue(this.taskPriorityDropDown.find(u => u.name === this.task.taskPriority))
        this.TaskForm.controls['ProjectId'].setValue(this.projectSelectList.find(u => u.value === this.task.projectId))
        this.TaskForm.controls['TaskDescription'].setValue(this.task.taskDescription)
        
           
      }
      
    })
     
    
  }

  onSubmit(){

    if(this.TaskForm.valid){
      if (this.TaskForm.value.ProjectId === undefined){
        var taskEdit:any = {
          id:this.task.id,
          taskName:this.TaskForm.value.TaskName,
          endDate:this.TaskForm.value.EndDate,
          taskStatuses:this.TaskForm.value.TaskStatus.name,
          taskPriority:this.TaskForm.value.TaskPriority.name,
          employeeId:this.user.EmployeeId,
          
          taskDescription:this.TaskForm.value.TaskDescription,
          createdById:this.user.UserID,
          EmployeeName:this.user.FullName,
          
        }

      }
      else{
        var taskEdit:any = {
          id:this.task.id,
          taskName:this.TaskForm.value.TaskName,
          endDate:this.TaskForm.value.EndDate,
          taskStatuses:this.TaskForm.value.TaskStatus.name,
          taskPriority:this.TaskForm.value.TaskPriority.name,
          employeeId:this.user.EmployeeId,
          projectId:this.TaskForm.value.ProjectId.value,
          taskDescription:this.TaskForm.value.TaskDescription,
          createdById:this.user.UserID,
          EmployeeName:this.user.FullName,
          ProjectName:this.TaskForm.value.ProjectId.label
        }
      }
      var formData = new FormData();
      for (let key in taskEdit) {
        if (taskEdit.hasOwnProperty(key)) {
          formData.append(key, (taskEdit as any)[key]);
        }
      }
      for (var i = 0; i < this.uploadedFiles.length; i++) {
        formData.append("TaskFiles", this.uploadedFiles[i]);
      }

      this.taskService.editTask(formData).subscribe({
        next: (res) => {

          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });

            this.TaskForm.reset();
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
      this.messageService.add({ severity: 'error', summary: 'Form Submit failed.', detail: "Please fill required inputs!!" });
    }

  }
  getProjectList(){
    this.projectService.getEmployeesProject(this.user.EmployeeId).subscribe({
      next: (res) => {
        this.projectSelectList = res.map(item => ({ value: item.id, label: item.projectName }));
      }
    })

  }
  closeModal()
  {
    this.activeModal.close()
  }
  onUpload(event: any) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
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
  viewPdf(link: string) {
    let modalRef
    if (this.isPDFFile(link)) {
      modalRef = this.modalService.open(ViewPdfComponent, { size:'lg', backdrop: 'static' })
      this.pdflink = this.getPdfFile(link);
      this.type = "pdf";
      
    }

    if (this.isImageFile(link)) {
      modalRef = this.modalService.open(ViewPdfComponent, {  backdrop: 'static' })
      this.pdflink = this.getImage(link);
      this.type = "image";
    }
    
    modalRef.componentInstance.type = this.type
    modalRef.componentInstance.pdflink = this.pdflink
  }
  getFile2() {

    if (this.filePath != null) {
      return this.filePath
    }
    if (this.task != null) {
      return this.getPdfFile(this.task.filePath!)
    }
    
  }
  onUpload2(event: any) {

    var file: File = event.target.files[0];
    this.fileGH = file
    
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.filePath = myReader.result;
    }
    myReader.readAsDataURL(file);
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
  }
}
