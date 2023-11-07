import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Table } from 'primeng/table';
import { CommonService } from 'src/app/services/common.service';
import { ComplaintService } from 'src/app/services/complaint.service';
import { EditComplaintComponent } from './edit-complaint/edit-complaint.component';



@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.scss']
})
export class ComplaintComponent implements OnInit {
  complaints: any
  loading: boolean = true;
  visible: boolean = false;

  @ViewChild('filter') filter!: ElementRef;
  constructor(
    private complaintService: ComplaintService,
    private commonService: CommonService,
    private router: Router,
    private modalSerivce: NgbModal){}
  ngOnInit(): void {
    this.getComplaints()
  }

  getComplaints() {
    this.complaintService. getComplaints().subscribe({
      next: (res) => {
        this.complaints = res
        this.loading = false
        
      }, error: (err) => {
        console.log(err)
      }

    })
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }
  getImage(url: string) {
    return this.commonService.createImgPath(url)
  }
  
  editComplaint(complaint :any){
    let modalRef = this.modalSerivce.open(EditComplaintComponent,{size:'l',backdrop:'static'})
    modalRef.componentInstance.complaint = complaint
    modalRef.result.then(()=>{this.getComplaints()})
  }
  
  complaintDetail(complaintId: any)
  {
    this.router.navigate(['/complaintdetail',complaintId])
  }

}
