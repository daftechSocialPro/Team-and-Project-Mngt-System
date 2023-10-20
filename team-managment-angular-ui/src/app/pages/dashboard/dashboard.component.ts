import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService, UserView } from 'src/app/services/user.service';
import { EmployeeComponent } from '../employee/employee.component';
import { EmployeeService } from 'src/app/services/employee.service';
import { Observable, from, mergeMap, map, forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit{
  projects: any;
  user : UserView;
  employeeProject:any;
  users: any;
  teams: any;
  employeeTeams:any;
  employees: any;
  tasks: any;
  employeeTask:any;
  pieData:any
  pieOptions:any
  projectStatuses: any;
  totalTaskCount: any;
  barOptions: any;
  barData: any;
  projectProgress: any[]=[];
  projectNames: any;
  progressArray: any;
  expProjectProgress: any[]=[];
  currentDate: Date;
  OverallProgress:any


  constructor(
    private userService:UserService,
    private projectService:ProjectService,
    private teamService:TeamService,
    private taskService:TaskService,
    private commonService:CommonService,
    private employeeService:EmployeeService
  ){}
  ngOnInit(): void {
    this.getUsers()
    this.user = this.userService.getCurrentUser()
    this.getProjects()
    this.getTeams()
    this.getTasks()
    this.getEmployees()

    this.getEmployeeProject()
    this.getEmployeeTeam()
    this.getEmployeeTasks()

    this.currentDate= new Date()
    this.getOverallProgress()
    


  }

  ngAfterViewInit(): void {
    
    this.initCharts()
    
  }
  allowedRoles(allowedRoles: any)
  {
    return this.userService.roleMatch(allowedRoles)
  }

  
  getUsers(){
    this.userService.getUserList().subscribe({
      next: (res)=>{
        this.users = res
      }, error: (err) => {
      }
    })
  }

  getProjects(){
    this.projectService.getProjects().subscribe({
      next: (res) => {
        this.projects = res
        
      }, error: (err) => {
      }
    })
  }
  getEmployeeProject(){
    this.projectService.getEmployeesProject(this.user.EmployeeId).subscribe({
      next: (res) => {
       this.employeeProject = res         
      }, error: (err) => {
      }
    })
  }

  getTeams(){
    this.teamService.getTeams().subscribe({
      next: (res) => {
        this.teams = res
      }, error: (err) => {
      }
    })
  }
getEmployeeTeam(){
  this.teamService.getEmployeesTeams(this.user.EmployeeId).subscribe({
    next: (res) => {
      this.employeeTeams= res
    }, error: (err) => {
    }
  })
}

  getEmployees(){
    this.employeeService.getEmployees().subscribe({
      next: (res) => {
        this.employees = res
        }, error: (err) => {
      }
    })
  }

  getTasks() {
    this.taskService.getAllTask().subscribe({
      next: (res) => {
        this.tasks = res;
        this.totalTaskCount = this.tasks.reduce((count, obj) => count + obj.tasks.length, 0);
      },
      error: (err) => {
      }
    });
  }
  getEmployeeTasks() {
    this.taskService.getTask(this.user.EmployeeId).subscribe({
      next: (res) => {
        this.employeeTask = res;
      
       
      },
      error: (err) => {
      }
    });
  }
  
  getOverallProgress(){
    this.projectService.getOverallProgress().subscribe(
      res => {
        this.OverallProgress = res
      }
    )
    
  }
  
  initCharts() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.projectStatuses = this.projects.map(project => project.projectStatus);
    const statusCounts = this.projectStatuses.reduce((counts,status)=> {
      counts[status] = (counts[status] || 0) + 1;
      return counts;
    },{})
    this.projectNames = this.projects.map(p=> p.projectName)
    const observables = this.projects.map(project => this.projectService.getProjectProgress(project.id))
     
    this.projects.forEach((p) => {
    
      const dueDate = new Date(p.dueDate);
      const createdDate = new Date(p.assignedDate);
      if (dueDate < this.currentDate ){
        this.expProjectProgress.push(100)
      }
      else{
        const totalDuration = Math.floor((dueDate.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        
        const elapsedDuration = Math.floor((this.currentDate.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        
        
        const expectedProgress = (elapsedDuration / totalDuration) * 100
        this.expProjectProgress.push(expectedProgress)
      }
      
    })
    
    
    
    
    const labels = Object.keys(statusCounts);
    const data = Object.values(statusCounts);
    
      this.pieData = {
        labels: labels,
        datasets: [
            {
                data: data,
                backgroundColor: [
                    '#1e87e4',
                    '#8866c3',
                    '#f4791f',
                    '#4dc7d6'
                ],
                hoverBackgroundColor: [
                    '#4296e2',
                    '#9b7dcc',
                    '#f48f4b',
                    '#69cfdb'
                ]
            }]
    }

    this.pieOptions = {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: textColor
                }
            }
        }
    }
    forkJoin(observables).subscribe(progressValues => {
      this.projectProgress.push(progressValues);
      
      this.barData = {
        labels: this.projectNames,
        datasets: [
            {
                label: 'Actual Project Progress',
                backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                borderColor: documentStyle.getPropertyValue('--primary-500'),
                data: this.projectProgress[0]
            },
            {
                label: 'Expected Project Progress',
                backgroundColor: documentStyle.getPropertyValue('--primary-200'),
                borderColor: documentStyle.getPropertyValue('--primary-200'),
                data: this.expProjectProgress
            }
          ]
        }
    })
  this.barOptions = {
      plugins: {
          legend: {
              labels: {
                  fontColor: textColor
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: textColorSecondary,
                  font: {
                      weight: 500
                  }
              },
              grid: {
                  display: false,
                  drawBorder: false
              }
          },
          y: {
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          },
      }
    }
  }
}
