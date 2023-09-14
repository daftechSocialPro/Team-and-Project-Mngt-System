import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    username: string;
   
    password!: string;

  

    constructor( private router: Router, private userService: UserService,

        private messageService: MessageService) { }

    ngOnInit(): void {

  
    }

    login() {

        if (this.username&& this.password){
  
    
            this.userService.login({
                UserName : this.username,
                Password:this.password
            }).subscribe({
                next: (res) => {

                    if (res.success) {
                        this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });

                        sessionStorage.setItem('token', res.data);
                        this.router.navigateByUrl('/');
                    }
                    else {

                        this.messageService.add({ severity: 'error', summary: 'Authentication failed.', detail: res.message });

                    }

                },
                error: (err) => {

                    console.log(err)

                }
            })
          
        }
        else{
            this.messageService.add({ severity: 'error', summary: 'Authentication failed.', detail: "Username and password required" });

        }
        }
    }

