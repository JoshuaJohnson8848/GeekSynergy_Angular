import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../Environment/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private _http: HttpClient) { }

  login(body: any): Observable<any> {
    return this._http.post(`${baseUrl}`, body);
  }

  signup(body: any): Observable<any>{
    return this._http.post(`${baseUrl}/signup`, body);
  }

  getUsers(): Observable<any>{
    return this._http.get(`${baseUrl}/user`);
  }

  getUserById(id: any): Observable<any>{
    return this._http.get(`${baseUrl}/user/${id}`);
  }

  deleteUser(id: any): Observable<any>{
    return this._http.delete(`${baseUrl}/user/${id}`);
  }

  updateUser(body: any, id: any): Observable<any>{
    return this._http.put(`${baseUrl}/user/${id}`, body);
  }

  resetPass(body: any): Observable<any>{
    return this._http.put(`${baseUrl}/user`, body);
  }
}
