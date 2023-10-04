import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { AuthGuard } from '../auth/auth.guard';
import { UserService, UserView } from '../services/user.service';
import { CommonService } from '../services/common.service';
import { MessageService } from 'primeng/api';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';


@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {

    items!: MenuItem[];
    user = this.userService.getCurrentUser()
    public connection!: signalR.HubConnection;
    urlHub: string = environment.baseUrl + "/ws/Chat"
    

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService,
      private authGuard:AuthGuard,
      private userService:UserService,
      private commonService:CommonService,   
      private messageService: MessageService
      ) { }

    ngOnInit(): void {
      this.connection = new signalR.HubConnectionBuilder()
            .withUrl(this.urlHub, {
              skipNegotiation: true,
              transport: signalR.HttpTransportType.WebSockets
            })
            .configureLogging(signalR.LogLevel.Debug)
            .build();

            this.connection.start()
            .then((res) => {
             
             this.connection.invoke('addDirectorToGroup',this.user.EmployeeId );
             
            })
            .catch((err) => console.log('Error while connecting to the server', err));
        
          
            
      if (this.connection) {
        this.connection.on('getNotice', (result) => {
          
          this.messageService.add({
            severity: 'info',
            summary: result.subject,
            detail: result.content,
            sticky: true
          });
          console.log("result",result)
        });
      }
    }

    logOut(){
        this.authGuard.logout()
    }
    showAnnouncement(): void {
        this.messageService.add({
          severity: 'info',
          summary: 'Important Announcement',
          detail: 'This is the announcement message.',
          sticky: true
        });
      }
    
    
    getImage(url: string) {
        return this.commonService.createImgPath(url)
      }

}
