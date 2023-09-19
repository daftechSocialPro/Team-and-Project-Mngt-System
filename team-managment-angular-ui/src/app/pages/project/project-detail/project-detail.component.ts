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
  
    this.projectService.getProject(this.projectId).subscribe(res => {    
      this.project = res
      this.projectTask = res.taskLists
      this.getEmpolyeeData(this.projectTask)
      })
       
  }
getEmpolyeeData(projectTask){
  this.employee = projectTask.map(u => u.employeeId)
  this.employee= this.employee.toString()
  console.log(this.employee)
  this.empolyeeService.getEmployee(this.employee).subscribe(
      res => {
        this.employee = res
        
      })

}

getImage(url: string) {
  return this.commonServive.createImgPath(url)
}

}
