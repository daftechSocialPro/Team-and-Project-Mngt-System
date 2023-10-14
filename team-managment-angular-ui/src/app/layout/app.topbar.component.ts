import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { AuthGuard } from '../auth/auth.guard';
import { UserService, UserView } from '../services/user.service';
import { CommonService } from '../services/common.service';
import { NoticeService } from '../services/notice.sercive';
import { MessageService } from 'primeng/api';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewTaskComponent } from '../components/view-task/view-task.component';
import { TaskService } from '../services/task.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
  styleUrls: ['../pages/task/task.component.scss']
})
export class AppTopBarComponent implements OnInit {
  
  items!: MenuItem[];
  user = this.userService.getCurrentUser()
  public connection!: signalR.HubConnection;
  urlHub: string = environment.baseUrl + "/ws/Chat"
  tasks:any[] = [];
  notices:any
  
  @ViewChild('menubutton') menuButton!: ElementRef;
  
  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
  
  @ViewChild('topbarmenu') menu!: ElementRef;
  
  constructor(public layoutService: LayoutService,
    private authGuard:AuthGuard,
    private userService:UserService,
    private commonService:CommonService,   
    private messageService: MessageService,
    private modalService: NgbModal,
    private taskService: TaskService,
    private router: Router,
    private noticeService: NoticeService,
    ) { }
    
    ngOnInit(): void {
      this.getTasks()
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
        if(this.allowedRoles(['Admin'])){
          this.connection.invoke('addDirectorToGroup','task')
        }
        this.connection.invoke('addDirectorToGroup',this.user.EmployeeId)
        
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
        });
        this.connection.on('getUserTaskNotice', (result,res) => {
          
          this.messageService.add({
            severity: 'info',
            summary: res,
            detail: result.taskName,
            sticky: true
          });
        });

        if(this.allowedRoles(['Admin'])){
          this.connection.on('getTaskNotice', (result,res) => {
            this.tasks.push(result) 
            
          })
        }
      }
      this.getNotices() 
    }
    
    logOut(){
      this.authGuard.logout()
    }
    
    getImage(url: string) {
      return this.commonService.createImgPath(url)
    }
    
    allowedRoles(allowedRoles: any)
    {
      return this.userService.roleMatch(allowedRoles)
    }
    redirectToComponent() {
      // Use the router's navigate method to navigate to the desired component
      this.router.navigate(['/profile']);
  }
    viewTask(task: any) {

      let modalRef = this.modalService.open(ViewTaskComponent, { size: 'lg', backdrop: 'static' })
      modalRef.componentInstance.task = task
      modalRef.result.then(()=>{this.getTasks()})
    }
    getTasks(){
      this.taskService.getPendingCompletedTasks().subscribe({
        next: (res) => {
          this.tasks=res
    
        }
      })
    }
    getNotices() {

      this.noticeService.getAllNotices().subscribe({
        next: (res) => {
          this.notices = res       
        }, error: (err) => {
        }
  
      })
    }
    getEmployee(){
      
    }
  }
  