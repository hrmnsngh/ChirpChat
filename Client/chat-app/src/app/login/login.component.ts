import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewChild } from '@angular/core';
import { ReCaptchaComponent } from 'angular2-recaptcha';
import { LoginService } from '../Services/login.service';
import { async } from 'q';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  @ViewChild(ReCaptchaComponent) captcha: ReCaptchaComponent;
  username;
  password;
  loginResponse;
  loginForm: FormGroup;
  verifyPic: Boolean = false;
  token;
  showPassword: Boolean = false;
  constructor(private fb: FormBuilder, private loginService: LoginService) {
    // window['verifyCallback'] = this.verifyCallback.bind(this);
    this.loginForm = this.fb.group({
      username: ['harman', Validators.required],
      password: ['password', Validators.required]
    });
  }

  // Implementing Captcha Using recaptcha api.js, direct way no imports
  // displayRecaptcha() {
  //   let doc = <HTMLDivElement>document.getElementById('signup-form');
  //   let script = document.createElement('script');
  //   script.innerHTML = '';
  //   script.src = 'https://www.google.com/recaptcha/api.js';
  //   script.async = true;
  //   script.defer = true;
  //   doc.appendChild(script);
  // }

  // verifyCallback(response) {
  //   //alert(response);
  //   this.verifyPic = true;
  //   console.log(this.verifyPic);
  //   console.log('Captcha verification successful');
  // }
  showPass() {
    this.showPassword = !this.showPassword;

  }
  handleCorrectCaptcha($event) {
    console.log($event);
    this.verifyPic = true;
    this.token = this.captcha.getResponse();
  }
  login(data) {
    console.log(data);
    this.loginService.postUser(data);
    this.loginResult();
  }

  async loginResult() {
    // console.log(this.loginService.getUser());
    await this.loginService.getUser().subscribe(data => {
      setTimeout(() => {
        this.loginResponse = data;
        console.log('Ts recieved response : ', data['data']);
      }, 10000);
    });
    setTimeout(() => {
      console.log(this.loginResponse);
      //this.loginService.getUser().unsubscribe();
    }, 10000);
  }
  ngOnInit() {
    // this.loginResult();
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {

  }

}
