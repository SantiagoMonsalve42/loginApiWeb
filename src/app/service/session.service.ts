import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class SessionService {
  url: string = environment.url;
  constructor(private httpClient: HttpClient) { }

  login(user:string,pass:string):Observable<any>{
    return this.httpClient.post(this.url+'/Usuario/login?username='+user+'&password='+pass,{});
  }
  registro(user:any):Observable<any>{
    return this.httpClient.post(this.url+'/Usuario/registro',user);
  }
}
