import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';
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
  users: any;
  teams: any;
  employees: any;
  tasks: any;
  pieData:any
  pieOptions:any
  projectStatuses: any;
  totalTaskCount: any;
  barOptions: any;
  barData: any;
  projectProgress: any[]=[];
  projectNames: any;
  progressArray: any;



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
    this.getProjects()
    this.getTeams()
    this.getTasks()
    this.getEmployees()
    
    
    

  }

  ngAfterViewInit(): void {
    
    this.initCharts()
    
  }

  
  getUsers(){
    this.userService.getUserList().subscribe({
      next: (res)=>{
        this.users = res
      }, error: (err) => {
        console.log(err)
      }
    })
  }

  getProjects(){
    this.projectService.getProjects().subscribe({
      next: (res) => {
        this.projects = res
        
      }, error: (err) => {
        console.log(err)
      }
    })
  }

  getTeams(){
    this.teamService.getTeams().subscribe({
      next: (res) => {
        this.teams = res
      }, error: (err) => {
        console.log(err)
      }
    })
  }

  getEmployees(){
    this.employeeService.getEmployees().subscribe({
      next: (res) => {
        this.employees = res
        }, error: (err) => {
        console.log(err)
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
        console.log(err);
      }
    });
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
     
    console.log("xxxxxxx",this.projectProgress)
    
    
    
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
                data: [10,20,30,40,50]
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
