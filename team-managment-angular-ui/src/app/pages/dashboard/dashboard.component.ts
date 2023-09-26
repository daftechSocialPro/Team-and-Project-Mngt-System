import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';
import { EmployeeComponent } from '../employee/employee.component';
import { EmployeeService } from 'src/app/services/employee.service';

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
    this.projectStatuses = this.projects.map(project => project.projectStatus);
    const statusCounts = this.projectStatuses.reduce((counts,status)=> {
      counts[status] = (counts[status] || 0) + 1;
      return counts;
    },{})
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
  }
}
