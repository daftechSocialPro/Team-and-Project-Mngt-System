import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }
  readonly BaseURI = environment.baseUrl;

  getTeams() {
    return this.http.get<any>(this.BaseURI + '/api/Team');
  }
  createTeam (fromData : FormData){
    return this.http.post<any>(this.BaseURI+'/api/Team',fromData);
  }

  getSelectedEmployee(){
    return this.http.get<any>(this.BaseURI+'/api/Employee/getEmployeesSelectList')
  }
  getEmployeeNotInTeam(teamId: any) {
    return this.http.get<any>(this.BaseURI + `/api/Team/GetEmployeeNotInTeam?teamId=${teamId}`);
  }
  getProjectOnTeam() {
    return this.http.get<any>(this.BaseURI +'/api/Project/GetProjectSelectList');
  }
 
}
