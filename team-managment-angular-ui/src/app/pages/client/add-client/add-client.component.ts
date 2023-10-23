import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UserService, UserView } from 'src/app/services/user.service';
import { ClientService } from 'src/app/services/client.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  
  user!: UserView;
  uploadedFiles: any[] = [];
  ClientForm!: FormGroup;
  clientFiles: File[];
  fileGH! : File;
  ImagePath: any=null;
  contractStatusDropdownItems = [
    { name: 'DRAFT', code: 'DRAFT' },
    { name: 'ACTIVE', code: 'ACTIVE' },
    { name: 'EXPIRED', code: 'EXPIRED' },
    { name: 'TERMINATED', code: 'TERMINATED' },
    { name: 'RENEWED', code: 'RENEWED' },
  ]
  

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private clientService: ClientService,
    private activeModal: NgbActiveModal
    
  ) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();

    this.ClientForm = this.formBuilder.group({
      Name: [null, Validators.required],
      Email: [null, Validators.required],
      Address: [null, Validators.required],
      PhoneNo: [null, Validators.required],
      Description: [null],
      ContractStatus:[null],
      ContractEndDate:[null],
      
    });
  }

  onSubmit() {
   
    if (this.ClientForm.valid) {
      var clientData:any = {
        Name:this.ClientForm.value.Name,
        Address:this.ClientForm.value.Address,
        Email: this.ClientForm.value.Email,
        Description:this.ClientForm.value.Description,
        PhoneNo:this.ClientForm.value.PhoneNo,
        CreatedById: this.user.UserID,
        ContractEndDate: this.ClientForm.value.ContractEndDate,
        ContractStatus: this.ClientForm.value.ContractStatus.name
        // ImagePath:this.projectId,
      }  
    
      var formData = new FormData();
      for (let key in clientData) {
        if (clientData.hasOwnProperty(key)) {
          formData.append(key, (clientData as any)[key]);
        }
      }
      formData.append("Image", this.fileGH);
     

      for (var i = 0; i < this.clientFiles.length; i++) {
        formData.append("ClientFiles", this.clientFiles[i]);
      }

  
      this.clientService.addClient(formData).subscribe({
        next: (res) => {

          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });

            this.ClientForm.reset();
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

  onUpload(event: any) {
    console.log(event,"uploadevent")
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
  }


  onClientFilesSelect(event: any) {
    this.clientFiles = event.files;
  }
  onUpload2(event: any) {

    var file: File = event.target.files[0];
    this.fileGH = file
    
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.ImagePath = myReader.result;
    }
    myReader.readAsDataURL(file);
    console.log(this.fileGH)
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
  }
  closeModal()
  {
    this.activeModal.close()
  }
  getImage2() {

    if (this.ImagePath != null) {
      return this.ImagePath
    }
    
    else {
      return 'assets/clientlogo.png'
    }
  }
}