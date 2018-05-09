import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class LoginService {

  private url = 'http://localhost:5000';
  private socket;
  private username;
  constructor() {
    this.socket = new io(this.url, { transports: ['websocket'] });
  }

  postUser(username) {
    console.log('In service postUser' + username);
    this.socket.emit('login', username);
  }

  getUser() {
    let observable = new Observable(observer => {
      this.socket.on('userSet', (data) => {
        this.username = data.username;
        console.log('In service get User (login)');
        observer.next(data.username);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
