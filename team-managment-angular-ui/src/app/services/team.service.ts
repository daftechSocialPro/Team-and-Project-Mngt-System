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
  getTeamMembersSelectList(teamId: any) {
    return this.http.get<any>(this.BaseURI + `/api/Team/GetTeamMembersSelectList?teamId=${teamId}`);
  }
  getProjectOnTeam() {
    return this.http.get<any>(this.BaseURI +'/api/Project/GetProjectSelectList');
  }
  editTeam (teamEdit : any){
    return this.http.put<any>(this.BaseURI+'/api/Team',teamEdit)
  }
  getTeamSelectList(){
    return this.http.get<any>(this.BaseURI +'/api/Team/GetTeamSelectList')
  }
  addMember(data: any) {
    console.log("addmember",data)
    return this.http.post<any>(this.BaseURI + '/api/Team/AddTeamMember', data);
  }
  
  removeMember(data: any) {
    console.log("removeMember",data)
    return this.http.post<any>(this.BaseURI + '/api/Team/RemoveTeamMember',data  );
  }
}

export interface TeamView {
  id : string ; 
  teamName : string ;
  teamEmployees : any [];
  teamProjects : any [];
}