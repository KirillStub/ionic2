import { Component } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { User } from '../../core/user.service';

@Component({
  selector: 'signin',
  templateUrl: 'signin.html',
  providers: [User]
})
export class SigninPage {
  formGroup:FormGroup;

  constructor(private formBuilder:FormBuilder,
              private user:User,
              private navCtrl:NavController) {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, this.emailValidator.bind(this)]],
      password: ['', Validators.required],
    });
  }

  private emailValidator(control:FormControl):{[s: string]: boolean} {
    if (!control.value.toLowerCase().match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      return {invalidEmail: true};
    }
  }

  submit() {
    if (this.formGroup.valid) {
      this.user.signin(
        this.formGroup.value.email,
        this.formGroup.value.password
      )
        .then((res) => this.navCtrl.pop());
    }
  }
}
