import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }
  readonly BaseURI = environment.baseUrl;

  getProjectChat(projectId:any) {
    return this.http.get<any>(this.BaseURI + '/api/Chat?projectId='+projectId);
  }

  sendChat(sendChat : any) {
    return this.http.post<any>(this.BaseURI + '/api/Chat',sendChat);
  }
}