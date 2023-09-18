import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor (
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private empolyeeService: EmployeeService,
      ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
    this.projectId = params.get('projectId');
    
  });
  
  this.projectService.getProject(this.projectId).subscribe({next:(res) => {
      
        
    this.project = res
    
  }})

  console.log(this.project.taskLists.employeeId)
  this.employee = this.empolyeeService.getEmployee(this.project.taskLists.employeeId)
  
}

}
