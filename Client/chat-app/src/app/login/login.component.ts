import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewChild } from '@angular/core';
import { ReCaptchaComponent } from 'angular2-recaptcha';
import { LoginService } from '../Services/login.service';

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
  loginAttempt;
  loginForm: FormGroup;
  verifyPic: Boolean = false;
  token;
  showPassword: Boolean = false;
  constructor(private fb: FormBuilder, private loginService: LoginService) {
    // window['verifyCallback'] = this.verifyCallback.bind(this);
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
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
    console.log(data.value);
    this.loginService.postUser(this.username);
  }

  loginResult() {
    this.loginService.getUser().subscribe(data => {
      this.loginAttempt.push(data);
      console.log(data);
    });
  }
  ngOnInit() {
    this.loginResult();
  }

}
