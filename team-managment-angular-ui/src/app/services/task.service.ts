import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }
  readonly BaseURI = environment.baseUrl;
  getAllTask() {
    return this.http.get<any>(this.BaseURI + '/api/Task/GetAllTasks');
  }
  getTask(employeeId:string) {
    return this.http.get<any>(this.BaseURI + '/api/Task?employeeId='+employeeId);
  }
  addTask(fromData : FormData){
    return this.http.post<any>(this.BaseURI + '/api/Task',fromData)
  }
  getSingleTask(taskId:any){
    return this.http.get<any>(this.BaseURI + '/api/Task/GetTask?taskId='+taskId)
  }
  editTask(fromData : FormData){
    return this.http.put<any>(this.BaseURI + '/api/Task',fromData)
  }
  updateStatus(data:any){
    return this.http.put<any>(this.BaseURI + '/api/Task/ChangeStatus', data)
  }
  getPendingCompletedTasks(){
    return this.http.get<any>(this.BaseURI + '/api/Task/GetPendingCompletedTasks')
  }
  
}





