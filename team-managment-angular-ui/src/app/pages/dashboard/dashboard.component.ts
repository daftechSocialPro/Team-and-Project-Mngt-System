import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService, UserView } from 'src/app/services/user.service';
import { EmployeeComponent } from '../employee/employee.component';
import { EmployeeService } from 'src/app/services/employee.service';

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
  projectProgress: any;
  projectNames: any;



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
  getEmployeeProject(){
    this.projectService.getEmployeesProject(this.user.EmployeeId).subscribe({
      next: (res) => {
       this.employeeProject = res         
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
getEmployeeTeam(){
  this.teamService.getEmployeesTeams(this.user.EmployeeId).subscribe({
    next: (res) => {
      this.employeeTeams= res
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
  getEmployeeTasks() {
    this.taskService.getTask(this.user.EmployeeId).subscribe({
      next: (res) => {
        this.employeeTask = res;
      
       
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
    this.projectProgress = this.projects.map(i => i.projectProgress)
    console.log(this.projectProgress)
    const labels = Object.keys(statusCounts);
    const data = Object.values(statusCounts);
    
      this.pieData = {
        labels: labels,
        datasets: [
            {
                data: data,
                backgroundColor: [
                    documentStyle.getPropertyValue('--indigo-500'),
                    documentStyle.getPropertyValue('--purple-500'),
                    documentStyle.getPropertyValue('--orange-500'),
                    documentStyle.getPropertyValue('--teal-500')
                ],
                hoverBackgroundColor: [
                    documentStyle.getPropertyValue('--indigo-400'),
                    documentStyle.getPropertyValue('--purple-400'),
                    documentStyle.getPropertyValue('--orange-400'),
                    documentStyle.getPropertyValue('--teal-400')
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
    this.barData = {
      labels: this.projectNames,
      datasets: [
          {
              label: 'Actual Project Progress',
              backgroundColor: documentStyle.getPropertyValue('--primary-500'),
              borderColor: documentStyle.getPropertyValue('--primary-500'),
              data: this.projectProgress
          },
          {
              label: 'Expected Project Progress',
              backgroundColor: documentStyle.getPropertyValue('--primary-200'),
              borderColor: documentStyle.getPropertyValue('--primary-200'),
              data: [28, 48, 40, 19, 86, 27, 90]
          }
      ]
  }

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
