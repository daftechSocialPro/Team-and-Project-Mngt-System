import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  addProject (projectAdd : any){

    return this.http.post<any>(this.BaseURI+'/api/Project',projectAdd);
  }

 
}
