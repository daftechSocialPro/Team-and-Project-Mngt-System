import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }
  readonly BaseURI = environment.baseUrl;

  getClients() {
    return this.http.get<any>(this.BaseURI + '/api/Client');
  }

  addClient (fromData : FormData){

    return this.http.post<any>(this.BaseURI+'/api/Client',fromData);
  }
  getClient(clientId : any) {
    return this.http.get(this.BaseURI + '/api/Client/GetClient?id='+clientId);
  }
  editClient (formData : FormData){
    return this.http.put<any>(this.BaseURI+'/api/Client',formData);
  }

}

