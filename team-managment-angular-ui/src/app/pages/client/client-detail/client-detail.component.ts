import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/services/common.service';
import { ClientService } from 'src/app/services/client.service';
import { UserService, UserView } from 'src/app/services/user.service';
import { Message, MessageService } from 'primeng/api';
import { ViewPdfComponent } from 'src/app/components/view-pdf/view-pdf.component';



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
  newContact: any = {};
  showAddContactDialog: boolean = false;
  constructor (
    private route: ActivatedRoute,
    private clientService: ClientService,
    private commonServive: CommonService,
    private userService: UserService,
    private modalSerivce: NgbModal,
    private messageService: MessageService,
  
    ) {}
    ngOnInit(): void {
      this.user = this.userService.getCurrentUser()
      this.route.paramMap.subscribe(params => {
        this.clientId = params.get('clientId');
      });
      this.getClient(this.clientId)
    }
    getClient(clientId){
      this.clientService.getClient(clientId).subscribe(res => {    
        this.client = res;
        console.log("dsadsds",this.client)
        console.log("ewwwww",this.client.clientContacts)

        });
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
    addContactPerson() {
      const newContact = {
        name: '',
        position: '',
        email: '',
        phoneNo: ''
      };
      this.client.clientContacts.push(newContact);
    }
    
    removeContact(index: number) {
      this.client.clientContacts.splice(index, 1);
    }
}
