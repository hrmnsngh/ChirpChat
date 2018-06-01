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
      this.socket.on('response', (data) => {
       console.log('In service get User (login)', data);
       // observer.next(data);
       if (err) {
         observer.error();
       }
       observer.complete();
      });
      return () => {
        this.socket.disconnect();
      };
    }
  );
    return observable;
  }
}
