import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../Services/register.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [RegisterService]
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  username: string;
  password: string;
  email: string;
  mobile: number;
  showPass: Boolean = false;
  slider: number;
  age: number;
  registrationResult;
  userExist: Boolean = false;
  constructor(private fb: FormBuilder, private router: Router, private registerService: RegisterService) {
    this.registrationForm = this.fb.group({
      username: ['harman', Validators.required],
      password: ['singh', Validators.required],
      email: ['harman@abc.com', Validators.required],
      mobile: ['0123564879', Validators.required],
      age: ['18', Validators.required]
    });
  }
  showPassword() {
    this.showPass = !this.showPass;
  }

  regForm(data) {
    console.log(data.value + 'data : ' + data.toString());
    //this.router.navigate(['']);
    console.log('Data passed' + JSON.stringify(data.value));
    this.registerService.post(data.value);
    this.getRegistrationResult();
    console.log(JSON.stringify(this.registrationResult));
  }
  getRegistrationResult() {
    this.registerService.get().subscribe(
      async data => {
        if (data) {
          console.log(data);
          this.registrationResult = data;
        } else {
          console.log('Error');
        }

      });
    setTimeout(() => {
      console.log('In ts recieved response  : ' + JSON.stringify(this.registrationResult), this.registrationResult);
    }, 12000);
    if (this.registrationResult === 1) {
      this.userExist = true;
    }
  }
  slide() {
    this.slider = document.getElementById('slider')['value'];
  }
  ngOnInit() {
    this.slider = document.getElementById('slider')['value'];
    //this.getRegistrationResult();
  }

}
