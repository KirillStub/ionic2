import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup'
import { SigninPage } from '../signin/signin'
import { Session } from '../../core/session.service'

@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private navCtrl:NavController,
              private session:Session,
              private alertCtrl:AlertController) {
  }

  goTo(page:string) {
    switch (page) {
      case 'signup' :
        this.navCtrl.push(SignupPage);
        break;
      case 'signin' :
        this.navCtrl.push(SigninPage);
        break;
      default :
        break;
    }
  }

  Logout() {
    this.session.delToken();
  }

  ShowToken() {
    let alert = this.alertCtrl.create({
      title: 'Token',
      subTitle: this.session.getToken(),
      buttons: ['OK']
    });
    alert.present();
  }
}
