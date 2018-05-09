import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class ChatService {

  private url = 'http://localhost:5000';
  private socket;
  private username;

  sendUser(username) {
    console.log('In service senduser ' + username);
    // this.username = username;
    this.socket.emit('setUserName', username);

  }

  sendMessages(msg) {
    if (this.username) {
      this.socket.emit('addmessage', { type: 'text', message: msg, user: this.username });
      console.log('In service ' + msg);
    }

  }



  getUsers() {
    let observable = new Observable(observer => {
      this.socket.on('userSet', (data) => {
        this.username = data.username;
        console.log('In service get user' + this.username);
        observer.next(data.username);
      });

      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('newmessage', (data) => {
        observer.next(data);
        console.log(data);
        console.log('In service get msgs' + data.message + data.user);
      });

      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
  constructor() {
    this.socket = new io(this.url, { transports: ['websocket'] });
  }

}
