import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {

  project:any
  projects:any
  employee:any
  projectId:string
  projectTask:any
  employeeName: string;
  employeeImage: any;
  constructor (
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private empolyeeService: EmployeeService,
    private commonServive: CommonService
      ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
    this.projectId = params.get('projectId');
    
    });
  
    this.getProjects(this.projectId)
    this.getProject(this.projectId)
       
  }

getProjects(projectId){
  this.projectService.getProject(projectId).subscribe(res => {    
    this.projects = res
         
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
