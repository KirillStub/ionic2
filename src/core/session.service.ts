import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class Session {
  private token:string;

  constructor(private storage:Storage) {
    storage.get('token').then((val) => {
      this.token = val;
    });
  }

  setToken(token:string) {
    this.token = token;
    this.storage.set('token', token);
  }

  getToken() {
    return this.token;
  }

  delToken() {
    this.token = null;
    this.storage.remove('token');
  }
}
