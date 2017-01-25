import { Component } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AlertController, NavController } from 'ionic-angular';
import { User } from '../../core/user.service';

@Component({
  selector: 'signup',
  templateUrl: 'signup.html',
  providers: [User]
})
export class SignupPage {
  formGroup:FormGroup;

  constructor(private formBuilder:FormBuilder,
              private user:User,
              private alertCtrl:AlertController,
              private navCtrl:NavController) {
    this.formGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, this.emailValidator.bind(this)]],
      password: ['', Validators.required]
    });
  }

  private emailValidator(control:FormControl):{[s: string]: boolean} {
    if (!control.value.toLowerCase().match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      return {invalidEmail: true};
    }
  }

  submit() {
    if (this.formGroup.valid) {
      this.user.signup(
        this.formGroup.value.email,
        this.formGroup.value.password,
        this.formGroup.value.firstName,
        this.formGroup.value.lastName
      ).then(() => this.showAlert())
    }
  }

  private showAlert() {
    let alert = this.alertCtrl.create({
      title: 'User created',
      subTitle: 'User was created successful. Now you can sign in.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }
}
