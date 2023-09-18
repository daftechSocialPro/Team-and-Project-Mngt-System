import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataView } from 'primeng/dataview';
import { CommonService } from 'src/app/services/common.service';
import { ProjectService } from 'src/app/services/project.service';
import { SelectItem } from 'primeng/api';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { Router } from '@angular/router';



@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss']
      })
export class ProjectComponent implements OnInit {


  projects: any
  loading: boolean = true;
  visible: boolean = false;
  editVisible: boolean = false;
  selectedId: string
  sortOptions: SelectItem[] = [];
  value: 0;

  
    

  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private projectService: ProjectService,
    private commonService: CommonService,
    private modalSerivce: NgbModal,
    private router: Router) { }

  ngOnInit(): void {
    this.getProjects()
    
    
  }

  getProjects() {

    this.projectService.getProjects().subscribe({
      next: (res) => {
        this.projects = res
        console.log(this.projects)
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


getProjectProgress(id: any){
  // console.log(this.projectService.getProjectProgress(id))
  return this.projectService.getProjectProgress(id)
  
}

projectDetail(projectId: any)
{
  this.router.navigate(['/projectdetail',projectId])
  

}

}

