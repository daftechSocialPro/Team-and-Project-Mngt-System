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
  
    this.projectService.getProject(this.projectId).subscribe(res => {    
      this.project = res;
      this.projectemp = this.project.projectEmployees.map(u => {
        return {
          name: u.name,
          imagePath: u.imagePath
        };
      });
      this.employeeTasks = res.taskLists.filter(u=> u.employeeId === this.user.EmployeeId )
      console.log("My Tasks",this.employeeTasks)
      
      })
       
  }


getProject(projectId){
  this.projectService.getProject(projectId).subscribe(res => {    
    this.project = res
         
    })
}

  getImage(url: string) {
    return this.commonServive.createImgPath(url)
  }

}
