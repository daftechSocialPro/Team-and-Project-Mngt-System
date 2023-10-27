import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectItem, MessageService } from 'primeng/api';
import { ViewPdfComponent } from 'src/app/components/view-pdf/view-pdf.component';
import { CommonService } from 'src/app/services/common.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProjectService, ProjectView } from 'src/app/services/project.service';
import { TeamService } from 'src/app/services/team.service';
import { UserView, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {
  
  @Input() projectId: string
  user : UserView
  project : any
  employeesSelectList: SelectItem[] = []
  employeesSelectedList: any

  teamsSelectList: SelectItem[] = []
  uploadedFiles: any[] = [];
  type: string = '';
  pdflink: string = '';


  assignedToDropdownItems = [
    { name: '', code: '' },
    { name: 'TEAM', code: 'TEAM' },
    { name: 'EMPLOYEE', code: 'EMPLOYEE' }]
  projectStatusDropdownItems = [
    { name: '', code: '' },
    { name: 'PENDING', code: 'PENDING' },
    { name: 'ONGOING', code: 'ONGOING' },
    { name: 'COMPLETED', code: 'COMPLETED' },
    { name: 'CANCELD', code: 'CANCELD' },
    
  ];
  selectedState: any = null;
  
  ProjectForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private projectService: ProjectService,
    private employeeService: EmployeeService,
    private activeModal: NgbActiveModal,
    private teamService: TeamService,
    private commonService: CommonService,
    private modalService: NgbModal
      
    ) { }

  ngOnInit(): void {

    this.user = this.userService.getCurrentUser()
    // this.project = this.projectService.getProject(this.projectId)
    
    this.getEmployeesSelectList()
    console.log(this.projectId)
    this.getTeamSelectList()
    this.ProjectForm = this.formBuilder.group({
      ProjectName: [null, Validators.required],
      Description: [null, Validators.required],
      AssignedDate: [null, Validators.required],
      DueDate: [null, Validators.required],
      ProjectStatus: [null, Validators.required],
      AssignedTo: [null, Validators.required],
      TeamId: [''],
      ProjectEmployees: [''],
      GitHubLink: [''],
      CompletionDate: [null],
      CompletionRemark: [null]
      
    
    })

    this.projectService.getProject(this.projectId).subscribe({next:(res) => {
               
      this.project = res
      
      this.ProjectForm.controls['ProjectName'].setValue(this.project.projectName )
      this.ProjectForm.controls['AssignedDate'].setValue(this.project.assignedDate.toString().split('T')[0] )
      this.ProjectForm.controls['Description'].setValue(this.project.description )
      this.ProjectForm.controls['DueDate'].setValue(this.project.dueDate.toString().split('T')[0] )
      this.ProjectForm.controls['ProjectStatus'].setValue(this.projectStatusDropdownItems.find(u => u.name === this.project.projectStatus) )
      this.ProjectForm.controls['AssignedTo'].setValue(this.assignedToDropdownItems.find(u => u.name === this.project.assignedTo) )
      this.ProjectForm.controls['ProjectEmployees'].setValue( this.project.projectEmployees.map(item => ({ value: item.id, label: item.name, imagePath: item.imagePath })) )
      this.ProjectForm.controls['GitHubLink'].setValue(this.project.gitHubLink )
      this.ProjectForm.controls['TeamId'].setValue(this.teamsSelectList.find(u=>u.value === this.project.teamProjects.map(u=>u.id)[0]))
      this.employeesSelectedList =  this.project.projectEmployees.map(u => u.id)
            
    }})
    
      
  }

  onSubmit() {
    console.log(this.ProjectForm.value)
    

    if (this.ProjectForm.valid) {
      if(this.ProjectForm.value.TeamId !== undefined)
        {
        var projectEdit:any ={
          Id:this.project.id,
          ProjectName:this.ProjectForm.value.ProjectName,
          Description:this.ProjectForm.value.Description,
          AssignedDate:this.ProjectForm.value.AssignedDate,
          DueDate:this.ProjectForm.value.DueDate,
          ProjectStatus:this.ProjectForm.value.ProjectStatus.name,
          AssignedTo:this.ProjectForm.value.AssignedTo.name,
          TeamId:this.ProjectForm.value.TeamId.value,
          GitHubLink:this.ProjectForm.value.GitHubLink,
          CreatedById:this.user.UserID,
          CompletionRemark:this.ProjectForm.value.CompletionRemark,
          CompletionDate:this.ProjectForm.value.CompletionDate
          
        }
      }
      else{
        var projectEdit:any ={
          Id:this.project.id,
          ProjectName:this.ProjectForm.value.ProjectName,
          Description:this.ProjectForm.value.Description,
          AssignedDate:this.ProjectForm.value.AssignedDate,
          DueDate:this.ProjectForm.value.DueDate,
          ProjectStatus:this.ProjectForm.value.ProjectStatus.name,
          AssignedTo:this.ProjectForm.value.AssignedTo.name,
          // ProjectEmployees:this.employeesSelectedList,
          GitHubLink:this.ProjectForm.value.GitHubLink,
          CreatedById:this.user.UserID,
          CompletionRemark:this.ProjectForm.value.CompletionRemark,
          CompletionDate:this.ProjectForm.value.CompletionDate
        }
      }

      console.log(projectEdit)
      var formData = new FormData();
      for (let key in projectEdit) {
        if (projectEdit.hasOwnProperty(key)) {
          formData.append(key, (projectEdit as any)[key]);
        }
      }
      for (var i = 0; i < this.employeesSelectedList.length; i++) {
        formData.append("ProjectEmployees", this.employeesSelectedList[i]);
      }
      for (var i = 0; i < this.uploadedFiles.length; i++) {
        formData.append("ProjectFiles", this.uploadedFiles[i]);
      }


      this.projectService.editProject(formData).subscribe({
        next: (res) => {

          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });

            this.ProjectForm.reset();
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

  getEmployeesSelectList() {
    this.employeeService.getEmployeesSelectList().subscribe({
      next: (res) => {
        this.employeesSelectList = res.map(item => ({ value: item.id, label: item.name, imagePath: item.imagePath }));
      }
    })
  }
  getTeamSelectList() {
    this.teamService.getTeamSelectList().subscribe({
      next: (res) => {
        this.teamsSelectList = res.map(item => ({ value: item.id, label: item.name }));
      }
    })
  }

  SelectItems(event: any)
  {
    this.employeesSelectedList = event.value.map(u=>u.value);
    console.log(event.value)
    
  }

  closeModal()
  {
    this.activeModal.close()
  }
  showInput()
  {
    return this.ProjectForm.value.AssignedTo.name

  }
  showInput2()
  {
    return this.ProjectForm.value.ProjectStatus.name

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
