import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Table } from 'primeng/table';
import { CommonService } from 'src/app/services/common.service';
import { NoticeService } from 'src/app/services/notice.sercive';
import { AddNoticeComponent } from './add-notice/add-notice.component';


@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss']
})
export class NoticeComponent implements OnInit {

  notices: any
  loading: boolean = true;
  visible: boolean = false;
  sortOrder: number = 0;
  sortField: string = '';

  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private commonService: CommonService,
    private modalSerivce: NgbModal,
    private noticeService: NoticeService,
  ) { }

  ngOnInit(): void {
    this.getNotices()
  }

  getNotices() {

    this.noticeService.getAllNotices().subscribe({
      next: (res) => {
        this.notices = res
        this.loading = false
      }, error: (err) => {
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
  addNotice(){
    
    let modalRef= this.modalSerivce.open(AddNoticeComponent,{size:'xl',backdrop:'static'})
    
    modalRef.result.then(()=>{this.getNotices()})
  }

}
