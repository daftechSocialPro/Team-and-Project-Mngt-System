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
  sortOptions: SelectItem[] = [];
  value: 0;
  selectedValue: string;
  dataViewValue: any[];

  dropdownOptions = [
    { label: 'All Projects', value: 'AP' },
    { label: 'My Projects', value: 'MP' }
    
  ];
    

  @ViewChild('filter') filter!: ElementRef;
  projectProgressMap: Map<number, number> = new Map<number, number>();

  constructor(
    private projectService: ProjectService,
    private commonService: CommonService,
    private modalSerivce: NgbModal,
    private router: Router,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.getProjects()
    this.getProject()
    
    
  }


  getProjects() {
    if (this.projects) {
      return;
    }
    this.projectService.getProjects().subscribe({
      next: (res) => {
        this.projects = res;
        this.projects.forEach((project) => {
          this.getProjectProgress(project.id).subscribe((progress: number) => {
            this.projectProgressMap.set(project.id, progress);
          });
        });
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

}

