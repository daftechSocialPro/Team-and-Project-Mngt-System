import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService, SelectItem } from 'primeng/api';
import { ViewPdfComponent } from 'src/app/components/view-pdf/view-pdf.component';
import { CommonService } from 'src/app/services/common.service';
import { ClientService } from 'src/app/services/client.service';
import { UserService, UserView } from 'src/app/services/user.service';

@Component({
  selector: 'app-editclient',
  templateUrl: './editclient.component.html',
  styleUrls: ['./editclient.component.scss']
})
export class EditclientComponent implements OnInit {
  @Input() client: any
  user!: UserView;
  uploadedFiles: any[] = [];
  ClientForm!: FormGroup;
  clientFiles: File[];
  fileGH! : File;
  ImagePath: any=null;
  contactForm: FormGroup;
  pdflink: string = '';
  type: string = '';
  contacts: any[] = [];
  constructor(private userService: UserService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private commonService: CommonService,
    private activeModal: NgbActiveModal,
    private clientService: ClientService,
    private modalService: NgbModal ){}
    ngOnInit(): void {
    
      this.user = this.userService.getCurrentUser()
      this.ClientForm = this.formBuilder.group({
        Name: [null, Validators.required],
        Email: [null, Validators.required],
        Address: [null, Validators.required],
        PhoneNo: [null, Validators.required],
        Description: [null],
      });
      

      this.ClientForm.controls['Name'].setValue(this.client.name)
      this.ClientForm.controls['Email'].setValue(this.client.email)
      this.ClientForm.controls['Address'].setValue(this.client.address)
      this.ClientForm.controls['PhoneNo'].setValue(this.client.phoneNo)
      this.ClientForm.controls['Description'].setValue(this.client.description)
      this.contactForm = this.formBuilder.group({
        contacts: this.formBuilder.array([])
      });
    }

  onSubmit(){
    this.submitContacts()

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








  get contactControls() {
    return this.contactForm.get('contacts') as FormArray;
  }

  

  addContact() {
    const contact = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      phone: [''],
      position: ['']
    });
    this.contactControls.push(contact);
    
    

  }

  removeContact(index: number) {
    this.contactControls.removeAt(index);
    this.contacts.splice(index, 1);
    console.log('contacts: ',this.contacts);
  }
  submitContacts() {
    const distinctContacts = new Set();
  
    for (const contactControl of this.contactControls.controls) {
      if (contactControl.valid) {
        const submittedData = {
          clientId:this.client.id,
          name: contactControl.get('name').value,
          email: contactControl.get('email').value,
          phoneNo: contactControl.get('phone').value,
          position: contactControl.get('position').value
        };
  
        // Create a unique key for each contact based on name and email
        const contactKey = submittedData.name + submittedData.email;
  
        // Add the contact to the Set only if it is not a duplicate
        if (!distinctContacts.has(contactKey)) {
          distinctContacts.add(contactKey);
          this.contacts.push(submittedData);
        }
      }
    }
  
    console.log('contacts: ', this.contacts);
    // Optionally, you can reset the form or perform any other actions after submitting the contacts.
    //this.contactControls.clear();
  }
}
