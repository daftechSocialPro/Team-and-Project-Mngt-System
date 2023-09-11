import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  showSpinner = false;

  constructor(private spinnerService: LoadingService, private cdRef: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.init();
   
  }

  init() {

    this.spinnerService.getSpinnerObserver().subscribe((status) => {
      this.showSpinner = (status === 'start');
      this.cdRef.detectChanges();
    });
  }

}
