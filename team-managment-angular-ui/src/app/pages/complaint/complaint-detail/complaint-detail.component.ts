import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewPdfComponent } from 'src/app/components/view-pdf/view-pdf.component';
import { CommonService } from 'src/app/services/common.service';
import { ComplaintService } from 'src/app/services/complaint.service';
import { UserService, UserView } from 'src/app/services/user.service';
import { AssignComplaintComponent } from '../assign-complaint/assign-complaint.component';

@Component({
  selector: 'app-complaint-detail',
  templateUrl: './complaint-detail.component.html',
  styleUrls: ['./complaint-detail.component.scss']
})
export class ComplaintDetailComponent implements OnInit {
  
  complaintId:any
  user: UserView
  complaint:any
  type: string = '';
  pdflink: string = '';
  
  constructor(
    private userService: UserService,
    private complaintService: ComplaintService,
    private route: ActivatedRoute,
    private modalSerivce: NgbModal,
    private commonService: CommonService
    ){}
    
    
    ngOnInit(): void {
      this.user = this.userService.getCurrentUser()
      this.route.paramMap.subscribe(params => {
        this.complaintId = params.get('complaintId');
      });
      this.getComplaint(this.complaintId)
    }
    getComplaint(complaintId){
      this.complaintService.getComplaint(complaintId).subscribe(res => {
        this.complaint=res
        console.log('complaint: ', this.complaint);
      })

      
    }
    getImage(url: string) {
      return this.commonService.createImgPath(url)
    }
    getPdfFile(url: string) {
      return this.commonService.getPdf(url)
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
        modalRef = this.modalSerivce.open(ViewPdfComponent, {  backdrop: 'static' })
        this.pdflink = this.getImage(link);
        this.type = "image";
      }
      else{
        modalRef = this.modalSerivce.open(ViewPdfComponent, { size:'lg', backdrop: 'static' })
        this.pdflink = this.getPdfFile(link);
        this.type = type
      }
      modalRef.componentInstance.type = this.type
      modalRef.componentInstance.pdflink = this.pdflink
    }
    assignComplaint(complaint:any){
      let modalRef = this.modalSerivce.open(AssignComplaintComponent,{ size:'lg', backdrop:'static'})
      modalRef.componentInstance.complaint = complaint
    }

}
  