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
}





