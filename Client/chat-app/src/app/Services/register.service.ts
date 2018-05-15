import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
@Injectable()
export class RegisterService {

  private url = 'http://localhost:5000';
  private socket;
  private username;
  private password;
  constructor() {
    this.socket = new io(this.url, { transports: ['websocket'] });
  }

  postUserRegistration(data) {
    console.log('In service register user : ' + data.value);
    this.socket.emit('register', data);
  }

  getRegistrationResult() {
    let observable = new Observable(observer => {
      this.socket.on('userSet', (data) => {
        this.username = data;
        console.log('In service result : ' + data + data.user);
        observer.next(data);
           });

      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
