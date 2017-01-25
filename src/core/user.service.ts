import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { API } from './api.service';
import { Session } from './session.service'

@Injectable()
export class User {
  defaultUser = {
    email: '',
    password: '',
    personal: {role: false},
    public: {
      avatar: 'default.jpg',
      background: 'default.jpg',
      firstName: '',
      lastName: ''
    }
  };

  constructor(private api:API,
              private alertCtrl:AlertController,
              private session: Session) {
  }

  signup(email:string, password:string, firstName:string, lastName:string) {
    let user = Object.assign({}, this.defaultUser, {
      email: email,
      password: password,
      public: {
        firstName: firstName,
        lastName: lastName
      }
    });
    return new Promise((resolve) => {
      this.api.post('signup', user)
        .subscribe(resolve, this.ShowError.bind(this));
    });
  }

  signin(email:string, password:string) {
    let user = Object.assign({}, this.defaultUser, {
      email: email,
      password: password,
    });
    return new Promise((resolve) => {
      this.api.post('signin', user)
        .subscribe((res) => {
          this.session.setToken(res.data.token);
          resolve(res);
        }, this.ShowError.bind(this));
    });
  }

  private ShowError(error) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: error._body,
      buttons: ['OK']
    });
    alert.present();
  }
}
