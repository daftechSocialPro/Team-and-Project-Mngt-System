import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }
  readonly BaseURI = environment.baseUrl;

  getProjects() {
    return this.http.get<any>(this.BaseURI + '/api/Project');
  }

  getProject(projectId : any) {
    return this.http.get<ProjectView>(this.BaseURI + '/api/Project/GetProject?projectId='+projectId);
  }
  getEmployeesProject(employeeId : string) {
    return this.http.get<any>(this.BaseURI + '/api/Project/GetEmpolyeesProjects?employeeId='+employeeId);
  }

  addProject (projectAdd : any){

    return this.http.post<any>(this.BaseURI+'/api/Project',projectAdd);
  }

  editProject (projectEdit : any){

    return this.http.put<any>(this.BaseURI+'/api/Project',projectEdit)
  }
  getProjectProgress(id : any) {
    return this.http.get<number>(this.BaseURI + '/api/Project/GetProjectProgress?id='+id);
  }
  getProjectSelectList(){
    return this.http.get<any>( this.BaseURI + '/api/Project/GetProjectSelectList')
  }
  getOverallProgress() {
    return this.http.get<any>(this.BaseURI + '/api/Project/GetOverallProgress');
  }

  
}
export interface ProjectView {
  id : string ; 
  projectName : string ;
  description : string ;
  assignedDate : Date ;
  dueDate: Date;
  projectStatus:string;
  assignedTo:string;
  gitHubLink:string;
  teamProjects: any [];
  projectEmployees: any [];
  taskLists: any[];
}