import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataView } from 'primeng/dataview';
import { CommonService } from 'src/app/services/common.service';
import { ProjectService } from 'src/app/services/project.service';
import { SelectItem } from 'primeng/api';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { AddProjectComponent } from './add-project/add-project.component';



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

  sortOrder: number = 0;

  sortField: string = '';

    

  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private projectService: ProjectService,
    private commonService: CommonService,
    private modalSerivce: NgbModal) { }

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


 

onSortChange(event: any) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    } else {
        this.sortOrder = 1;
        this.sortField = value;
    }
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

onProjectAdded(event: any) {
  
  this.visible = false;
  this.getProjects()
}
editProject(projectId){
  let modalRef= this.modalSerivce.open(EditProjectComponent,{size:'xl',backdrop:'static'})
  modalRef.componentInstance.projectId = projectId
  modalRef.result.then(()=>{this.getProjects()})
}

onProjectEdited(event: any) {
  
  this.editVisible = false;
  this.getProjects()
}
}

