import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/services/common.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserService, UserView } from 'src/app/services/user.service';
import { AddTaskComponent } from '../../task/add-task/add-task.component';
import { TeamService } from 'src/app/services/team.service';
import { Message, MessageService } from 'primeng/api';
import { ChatService } from 'src/app/services/chat.sercive';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit, AfterViewInit {
  user: UserView
  project:any
  employeeTasks
  projectId:string
  projectemp:any

  completeCount:any = 0;
  inprogresCount:any = 0;
  notstartedCount:any = 0;
  overdueCount:any = 0;
  onholdCount:any=0;
  allTask:any=0;
  tasksArray:any;
  messages: Message[] = [];
  newMessage: string;
  selectedValue: string;
  dataViewValue: any[];
  dropdownOptions = [
    { label: 'All Tasks', value: 'AT' },
    { label: 'My Tasks', value: 'MT' }
    
  ];
  projectProgress: any;
  public connection!: signalR.HubConnection;
  urlHub : string = environment.baseUrl+"/ws/Chat"
    

 
  constructor (
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private commonServive: CommonService,
    private userService: UserService,
    private modalSerivce: NgbModal,
    private teamService: TeamService,
    private chatService: ChatService,
    private messageService: MessageService
      ) {}


  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.route.paramMap.subscribe(params => {
    this.projectId = params.get('projectId');
    });

  
    this.getProject(this.projectId)
    this.getMessages(this.projectId)
    
      
}
ngAfterViewInit(): void {
  this.connection = new signalR.HubConnectionBuilder()
    .withUrl(this.urlHub, {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets
    })
    .configureLogging(signalR.LogLevel.Debug)
    .build();

  this.connection.start()
    .then((res) => {
     
     this.connection.invoke('addDirectorToGroup', this.projectemp.map(u=>u.value));
     
    })
    .catch((err) => console.log('Error while connecting to the server', err));

  

  if (this.connection){

  this.connection.on('getNotification', (result) => {
    this.getMessages(this.projectId)
  });

  } 
}



  
getProject(projectId){
  this.projectService.getProject(projectId).subscribe(res => {    
    this.project = res;
    this.projectemp = this.project.projectEmployees.map(u => {
      return {
        name: u.name,
        imagePath: u.imagePath,
        value:u.id
      };
    });
    if( res.teamProjects.length > 0){
      this.teamService.getTeamMembersSelectList(this.project.teamProjects.map(i => i.id)).subscribe({
        next: (res) => {
          this.projectemp = res.map(i => ({value: i.id, name: i.name,imagePath:i.imagePath }))
        }
      })
    }
    
    this.dataViewValue = this.project.taskLists;
    this.employeeTasks = res.taskLists.filter(u=> u.employeeId === this.user.EmployeeId )
    this.projectService.getProjectProgress(res.id).subscribe((progress: number) => {
      this.projectProgress = progress
    });
     this.project.taskLists.forEach(task => {
        
        switch (task.taskStatuses) {
          case 'COMPLETE':
            this.completeCount++;
            break;
          case 'INPROGRESS':
            this.inprogresCount++;
            break;
          case 'NOTSTARTED':
            this.notstartedCount++;
            break;
          case 'OVERDUE':
            this.overdueCount++;
            break;
          case 'ONHOLD':
            this.onholdCount++;
            break;
          default:
            break;
        }
        this.allTask++;
      });
        
    })
     
}

openLink(): void {
  const link = this.project.gitHubLink; 
  window.open(link, '_blank');
}



getImage(url: string) {
  return this.commonServive.createImgPath(url)
}
onDataViewChange() {
    
  if (this.selectedValue === 'AT') {
    this.dataViewValue = this.project.taskLists;
  } else if (this.selectedValue === 'MT') {
    this.dataViewValue = this.employeeTasks;
  
}
}
assignTask(projectId,teamProject,projectEmployees){
  let modalRef= this.modalSerivce.open(AddTaskComponent,{size:'xl',backdrop:'static'})
  modalRef.componentInstance.projectId = projectId
  modalRef.componentInstance.teamProject = teamProject
  modalRef.componentInstance.projectEmployees = projectEmployees
  modalRef.result.then(()=>{this.getProject(this.projectId)})
}
allowedRoles(allowedRoles: any)
  {
    return this.userService.roleMatch(allowedRoles)
  }
  

  sendMessage() {
    if (this.newMessage) {
      this.messages.push({ severity: 'info', detail: this.newMessage });
      var sendChat:any = {
        employeeId:this.user.EmployeeId,
        projectId:this.projectId,
        message:this.newMessage,
        createdById:this.user.UserID,
        employeeIds:this.projectemp.map(u=>u.value)
      }
      this.chatService.sendChat(sendChat).subscribe({
        next: (res) => {

          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });

          }

        }, error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: err });
        }
      })

      this.newMessage = '';
    }
  }
  getMessages(projectId){
    this.chatService.getProjectChat(projectId).subscribe({
      next: (res)=> {
        console.log("chat",res)
        this.messages = res
        console.log("message",this.messages)
      }
    })
  }

}
