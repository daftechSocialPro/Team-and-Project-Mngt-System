import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  @Input() clientId: string
  user!: UserView;
  uploadedFiles: any[] = [];
  ClientForm!: FormGroup;
  clientFiles: File[];
  fileGH! : File;
  ImagePath: any=null;
  client: any;
  pdflink: string = '';
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
    }

  closeModal()
  {
    this.activeModal.close()
  }
}
