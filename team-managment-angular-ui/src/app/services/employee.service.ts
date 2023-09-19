import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }
  readonly BaseURI = environment.baseUrl;

  getEmployees() {
    return this.http.get<any>(this.BaseURI + '/api/Employee');
  }
  getEmployee(employeeId) {
    return this.http.get<any>(this.BaseURI + '/api/Employee/getEmployee?employeeId='+employeeId);
  }
  addEmployee (fromData : FormData){

    return this.http.post<any>(this.BaseURI+'/api/Employee',fromData);
  }

  getEmployeeNouser(){
    return this.http.get<any>(this.BaseURI+"/api/Employee/getEmployeeNoUser")
  }
  getEmployeesSelectList(){
    return this.http.get<any>(this.BaseURI+"/api/Employee/getEmployeesSelectList")
  }
}
