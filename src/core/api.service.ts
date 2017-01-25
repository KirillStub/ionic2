import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

let server = 'http://193.124.181.87/';

@Injectable()
export class API {

  constructor(private http:Http) {
  }

  post(url:string, data:any) {
    return this.http.post(server + url, {requestData: data})
      .map(response => response.json());
  }
}
