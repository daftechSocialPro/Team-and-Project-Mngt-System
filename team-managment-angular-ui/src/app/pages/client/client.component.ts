import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Table } from 'primeng/table';
import { CommonService } from 'src/app/services/common.service';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent  implements OnInit {
  

  clients: any
  loading: boolean = true;
  visible: boolean = false;

  @ViewChild('filter') filter!: ElementRef;
  constructor(
    private clientService: ClientService,
    private commonService: CommonService,
    private router: Router,
    private modalSerivce: NgbModal) { }
  ngOnInit(): void {
this.getClients()
  }
  getClients() {

 
    this.clientService. getClients().subscribe({
      next: (res) => {
        this.clients = res
        this.loading = false
        console.log(" this.clients", this.clients)
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
  addClients() {

    this.visible = true

  }
  onClientAdded(event: any) {
    
    this.visible = false;
    this.getClients()
  }
  clientDetail(clientId: any)
  {
    this.router.navigate(['/clientdetail',clientId])
  }
}
