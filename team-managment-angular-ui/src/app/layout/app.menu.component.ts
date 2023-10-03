import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService,
                private userService: UserService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
                ,roleMatch: true 
            },
            {
                label:'pages',
                items: [
                    { label: 'Projects', icon: 'pi pi-fw pi-book', routerLink: ['/projects']},
                    { label: 'Tasks', icon: 'pi pi-fw pi-list', routerLink: ['/tasks'] },
                    { label: 'Teams', icon: 'pi pi-fw pi-id-card', routerLink: ['/teams']},
                    
                    
                ]
                ,roleMatch: this.roleMatch(["Developer","Admin"]) 

            },
            {
                label:'Admin',
                items: [
                    { label: 'Users', icon: 'pi pi-fw pi-user-plus', routerLink: ['/users'] },
                    { label: 'Employees', icon: 'pi pi-fw pi-users', routerLink: ['/employees'] },
                    { label: 'Announcement', icon: 'pi pi-fw pi-megaphone', routerLink: ['/notice'] },
                ]
                ,roleMatch: this.roleMatch(["Admin"])

            }
           
        ];
    }

    roleMatch(value:string[]){
        return this.userService.roleMatch(value)
    }
}
