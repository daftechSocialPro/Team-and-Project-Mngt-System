import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserService, UserView } from 'src/app/services/user.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
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

  selectedValue: string;
  dataViewValue: any[];
  dropdownOptions = [
    { label: 'All Tasks', value: 'AT' },
    { label: 'My Tasks', value: 'MT' }
    
  ];
  projectProgress: any;
    

 
  constructor (
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private commonServive: CommonService,
    private userService: UserService
      ) {}


  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.route.paramMap.subscribe(params => {
    this.projectId = params.get('projectId');
    });

  
    this.getProject(this.projectId)
       
  }



  
getProject(projectId){
  this.projectService.getProject(projectId).subscribe(res => {    
    this.project = res;
    this.projectemp = this.project.projectEmployees.map(u => {
      return {
        name: u.name,
        imagePath: u.imagePath
      };
    });
    this.dataViewValue = this.project.taskLists;
    this.employeeTasks = res.taskLists.filter(u=> u.employeeId === this.user.EmployeeId )
    this.projectService.getProjectProgress(res.id).subscribe((progress: number) => {
      this.projectProgress = progress
    });
     this.project.taskLists.forEach(task => {
        console.log("foreachstatus", task.taskStatuses);
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
        // Increment the task count regardless of the status
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


}
