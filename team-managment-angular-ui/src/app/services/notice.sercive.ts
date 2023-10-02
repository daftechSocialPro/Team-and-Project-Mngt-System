import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  constructor(private http: HttpClient) { }
  readonly BaseURI = environment.baseUrl;
  getAllNotices() {
    return this.http.get<any>(this.BaseURI + '/api/Notice');
  }
  getNotice(id:any) {
    return this.http.get<any>(this.BaseURI + '/api/Notice/GetNotice?id='+id);
  }

  postNotice(postNotice : any) {
    return this.http.post<any>(this.BaseURI + '/api/Notice',postNotice);
  }
}