import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  url = '  http://localhost:3000/user';

  get() {
    return this.http.get(this.url);
  }
  getById(key: any) {
    return this.http.get(this.url + '/' + key);
  }
  post(data: any) {
    return this.http.post(this.url, data);
  }
  update(key: any, data: any) {
    return this.http.put(this.url + '/' + key, data);
  }
}
