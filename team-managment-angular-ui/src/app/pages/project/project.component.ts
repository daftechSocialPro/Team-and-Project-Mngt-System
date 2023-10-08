import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataView } from 'primeng/dataview';
import { CommonService } from 'src/app/services/common.service';
import { ProjectService } from 'src/app/services/project.service';
import { SelectItem } from 'primeng/api';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { Router } from '@angular/router';
import { UserService, UserView } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';



@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss']
      })
export class ProjectComponent implements OnInit {

  user : UserView
  project:any
  projects: any
  loading: boolean = true;
  visible: boolean = false;
  editVisible: boolean = false;
  selectedId: string
  sortOrder: number = 0;
  sortField: string = '';
  selectedValue: string;
  dataViewValue: any[];
  sortOptions: any[] = [
    { label: 'Name', value: 'projectName' },
    { label: 'Status', value: 'projectStatus' },
    { label: 'Date', value: 'dueDate'}
  ];

  truncatedDescription: string;
  currentDate:Date 

  dropdownOptions = [
    { label: 'All Projects', value: 'AP' },
    { label: 'My Projects', value: 'MP' }
    
  ];
    

  
  projectProgressMap: Map<number, number> = new Map<number, number>();
  expProjectProgressMap: Map<number, any> = new Map<number, any>();
  expectedProgress: number;

  constructor(
    private projectService: ProjectService,
    private commonService: CommonService,
    private modalSerivce: NgbModal,
    private router: Router,
    private userService: UserService,
   
    
    ) {}

  ngOnInit(): void {
    this.currentDate= new Date()
    this.user = this.userService.getCurrentUser()
    this.getProjects()
    this.getProject()
    
    
  }


  getProjects() {
    
    this.projectService.getProjects().subscribe({
      next: (res) => {
        this.projects = res;
        this.projects.forEach((project) => {
          this.getProjectProgress(project.id).subscribe((progress: number) => {
            this.projectProgressMap.set(project.id, progress);
            
          });
        });
        this.projects.forEach((p) => {
          const dueDate = new Date(p.dueDate);
          const createdDate = new Date(p.assignedDate);
          const totalDuration = dueDate.getTime() - createdDate.getTime();
          const elapsedDuration = this.currentDate.getTime() - createdDate.getTime();
          const expectedProgress = ((elapsedDuration / totalDuration) * 100).toFixed(2);
          this.expProjectProgressMap.set(p.id,expectedProgress)
          
        })
        
          
  
        this.loading = false
        this.dataViewValue = this.projects;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getProject(){
    
    this.projectService.getEmployeesProject(this.user.EmployeeId).subscribe({
      next: (res) => {
       this.project = res      
       this.project.forEach((project) => {
        this.getProjectProgress(project.id).subscribe((progress: number) => {
          this.projectProgressMap.set(project.id, progress);
        });
        this.project.forEach((project) => {
          this.checkTaskOverdue(project);
          this.getDescription(project);
        });
   
    
      });
 
               
      }, error: (err) => {
        console.log(err)
      }

      

    })
  }
  

  onFilter(dv: DataView, event: Event) {
    dv.filter((event.target as HTMLInputElement).value);
}

  getImage(url: string) {
    return this.commonService.createImgPath(url)
  }
  addProject() {
    let modalRef= this.modalSerivce.open(AddProjectComponent,{size:'xl',backdrop:'static'})
    
    modalRef.result.then(()=>{this.getProjects()})
  }


  editProject(projectId){
    let modalRef= this.modalSerivce.open(EditProjectComponent,{size:'xl',backdrop:'static'})
    modalRef.componentInstance.projectId = projectId
    modalRef.result.then(()=>{this.getProjects()})
  }

  getProjectProgress(id: any): Observable<number> {
    return this.projectService.getProjectProgress(id);
  }

  projectDetail(projectId: any)
  {
    this.router.navigate(['/projectdetail',projectId])
  }

  allowedRoles(allowedRoles: any)
  {
    return this.userService.roleMatch(allowedRoles)
  }
  onDataViewChange() {
    
    if (this.selectedValue === 'AP') {
      this.dataViewValue = this.projects;
    } else if (this.selectedValue === 'MP') {
      this.dataViewValue = this.project;
    
  }
}
onSortChange(event: any): void {
  const value = event.value;

  if (value.indexOf('!') === 0) {
    this.sortOrder = -1;
    this.sortField = value.substring(1);
  } else {
    this.sortOrder = 1;
    this.sortField = value;
  }

  // Perform the actual sorting
  this.projects.sort((a, b) => {
    return a[this.sortField].localeCompare(b[this.sortField]) * this.sortOrder;
  });
}
calculateProgressBarColor(id): string {
  const progressDifference = this.projectProgressMap.get(id) - this.expProjectProgressMap.get(id);
  const percentageDifference = progressDifference / this.expProjectProgressMap.get(id);

  
  const red = Math.round(255 * Math.max(0, percentageDifference));
  const green = Math.round(255 * Math.max(0, -percentageDifference));
  const blue = 0;

  
  return `background-color: rgb(${red}, ${green}, ${blue})`;
}

  isTaskOverdue(dueDate: Date): boolean {
    const endDateObj = new Date(dueDate);
    const todayObj = new Date();
    endDateObj.setHours(0, 0, 0, 0);
    todayObj.setHours(0, 0, 0, 0);
    return endDateObj < todayObj;
  }
  checkTaskOverdue(project) {
    const endDate = new Date(project.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

   
  }

  getDescription(project){
    if (project.description.length > 100) {
      project.description = project.description.substring(0, 100) + '...';
    }
  }


getColor(progress) {
  if (progress >= 70) {
    return 'bg-success';
  } else if (progress >= 30) {
    return 'bg-warning';
  } else {
    return 'bg-danger';
  }
};

}

