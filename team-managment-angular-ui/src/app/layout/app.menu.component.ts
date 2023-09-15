import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label:'pages',
                items: [
                    { label: 'Projects', icon: 'pi pi-fw pi-book', routerLink: ['/uikit/formlayout'] },
                    { label: 'Tasks', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/input'] },
                    { label: 'Teams', icon: 'pi pi-fw pi-id-card', routerLink: ['/teams'] },
                    { label: 'Employees', icon: 'pi pi-fw pi-users', routerLink: ['/employees'] },
                    { label: 'Users', icon: 'pi pi-fw pi-user-plus', routerLink: ['/users'] },
                
                ]

            },
           
        ];
    }
}
