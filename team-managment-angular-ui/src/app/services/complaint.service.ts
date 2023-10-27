import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  constructor(private http: HttpClient) { }
  readonly BaseURI = environment.baseUrl;

  getComplaints() {
    return this.http.get<any>(this.BaseURI + '/api/Complaint');
  }
  getComplaint(id:any) {
    return this.http.get<any>(this.BaseURI + '/api/Complaint/GetComplaint?id='+id);
  }
  assignComplaint(assignComplaint:any){
    return this.http.post<any>(this.BaseURI + '/api/Complaint/AssignComplaint',assignComplaint)
  }
  editComplaint(formData: FormData){
    return this.http.put<any>(this.BaseURI + '/api/Complaint',formData)
  }
}