import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { AuthGuard } from '../auth/auth.guard';
import { UserService, UserView } from '../services/user.service';
import { CommonService } from '../services/common.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];
    

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService,private authGuard:AuthGuard,private userService:UserService,private commonService:CommonService,   private messageService: MessageService) { }


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
    
    user = this.userService.getCurrentUser()
    getImage(url: string) {
        return this.commonService.createImgPath(url)
      }

}
