import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-pdf',
  templateUrl: './view-pdf.component.html',
  styleUrls: ['./view-pdf.component.scss']
})
export class ViewPdfComponent implements OnInit {

  @Input()  pdflink !: string
  @Input() type!: string;
  constructor(private activeMOdal :NgbActiveModal){}

  ngOnInit(): void {
    
  }

  closeModal(){
    this.activeMOdal.close()
  }
}
