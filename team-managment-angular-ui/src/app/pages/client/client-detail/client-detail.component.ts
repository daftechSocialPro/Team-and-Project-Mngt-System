import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/services/common.service';
import { ClientService } from 'src/app/services/client.service';
import { UserService, UserView } from 'src/app/services/user.service';
import { Message, MessageService } from 'primeng/api';
import { ViewPdfComponent } from 'src/app/components/view-pdf/view-pdf.component';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss']
})
export class ClientDetailComponent implements OnInit {
  user: UserView
  client:any
  clientContact:any
  clientId:string
  type: string = '';
  pdflink: string = '';
  contactForm: FormGroup;
  // contacts: any[] = [];
  constructor (
    private route: ActivatedRoute,
    private clientService: ClientService,
    private commonServive: CommonService,
    private userService: UserService,
    private modalSerivce: NgbModal,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
  
    ) {}
    ngOnInit(): void {
      this.user = this.userService.getCurrentUser()
      this.route.paramMap.subscribe(params => {
        this.clientId = params.get('clientId');
      });
      this.getClient(this.clientId)
      // this.addContact()
      this.contactForm = this.formBuilder.group({
        contacts: this.formBuilder.array([]), 
      });
    }
    getClient(clientId){
      this.clientService.getClient(clientId).subscribe(res => {    
        this.client = res;
        console.log("dsadsds",this.client)
        console.log("ewwwww",this.client.clientContacts)
        });
    }
    get contacts(): FormArray {
      return this.contactForm.get('contacts') as FormArray;
    }
    addContact() {
     
      this.contacts.push(this.createContactFormGroup());
    }
    createContactFormGroup(): FormGroup {
      return this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', Validators.email],
        phone: [''],
        position: ['']
      });
    }
    removeContact(index: number) {
      this.contacts.removeAt(index);
    }
  
    get contactControls() {
      return this.contactForm.get('contacts') as FormArray;
    }
    // if (this.NoticeForm.valid) {

    //   var postNotice: any = {
    //     subject: this.NoticeForm.value.Subject,
    //     content: this.NoticeForm.value.Content,
    //     projectId: this.NoticeForm.value.ProjectId,
    //     teamId: this.NoticeForm.value.TeamId,
    //     employeeId: this.user.EmployeeId,
    //     createdById: this.user.UserID,
    //     // employeeIds:this.projectemp.map(u=>u.value)
    //   }
    //   this.setProjEmp(postNotice)
     
    // }
    // else {
    //   this.messageService.add({ severity: 'error', summary: 'Form Submit failed.', detail: "Please fil required inputs !!" });
    // }

    submitContacts() {
      const distinctContacts = new Set<string>();
   const   submittedDataArray = [];
    
      for (const contactControl of this.contactControls.controls) {
        if (contactControl.valid) {
          const submittedData = {
            clientId:this.clientId,
            name: contactControl.get('name').value,
            email: contactControl.get('email').value,
            phoneNo: contactControl.get('phone').value,
            position: contactControl.get('position').value
          };
          submittedDataArray.push(submittedData)
    
          const contactKey = submittedData.name + submittedData.email;
          if (!distinctContacts.has(contactKey)) {
            distinctContacts.add(contactKey);
    
            this.clientService.addClientcus(submittedDataArray).subscribe(
              (res: any) => {
                if (res.success) {
                  this.messageService.add({ severity: 'success',  summary: 'Successful', detail: res.message });
                  this.contactForm.reset();
                } else {
                  this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });
                }
              },
              (err: any) => {
                this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: err });
              }
            );
          }
        }
      }
    }
    getImage(url: string) {
      return this.commonServive.createImgPath(url)
    }
    getPdfFile(url: string) {
      return this.commonServive.getPdf(url)
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
        modalRef = this.modalSerivce.open(ViewPdfComponent, { size:'lg', backdrop: 'static' })
        this.pdflink = this.getPdfFile(link);
        this.type = "pdf";
      }
      if (this.isImageFile(link)) {
        modalRef = this.modalSerivce.open(ViewPdfComponent, {  backdrop: 'static' })
        this.pdflink = this.getImage(link);
        this.type = "image";
      }
      modalRef.componentInstance.type = this.type
      modalRef.componentInstance.pdflink = this.pdflink
    }

}
