import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  readonly BaseURI = environment.baseUrl;

  login(formData: any) {
    return this.http.post<any>(this.BaseURI + '/api/Authentication/Login', formData);
  }
  getUserList (){
    return this.http.get<any>(this.BaseURI+"/api/Authentication/GetUserList")
  }
  roleMatch(allowedRoles: any): boolean {

    var isMatch = false;
    var token = sessionStorage.getItem('token')

    var payLoad = token? JSON.parse(window.atob(token!.split('.')[1])):"";

    var userRole: string[] =payLoad? payLoad.role.split(","):[];
    allowedRoles.forEach((element: any) => {
      if (userRole.includes(element)) {
        isMatch = true;
        return false;
      }
      else {
        return true;
      }
    });
    return isMatch;
  }
  getCurrentUser(){
    var payLoad = JSON.parse(window.atob(sessionStorage.getItem('token')!.split('.')[1]));

    console.log(payLoad)
    let user : UserView={
      UserID : payLoad.userId,
      FullName: payLoad.fullName,
      role : payLoad.role.split(","),
      EmployeeId:payLoad.employeeId,
      Photo : payLoad.photo
    }
    console.log(user)
    return user ; 
  }
  getUserRoles (){
    
    return this.http.get<any>(this.BaseURI+"/api/Authentication/GetRoleCategory")
    
  }
  addUser (value : any){

    return this.http.post<any>(this.BaseURI+"/api/Authentication/AddUser",value)
  }


}
export interface UserView {
  FullName : string ; 
  role: string [];
  UserID : string ;
  EmployeeId:string;
  Photo:string;
}