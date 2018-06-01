import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import * as io from 'socket.io-client';
@Injectable()
export class RegisterService {

  private url = 'http://localhost:5000';
  private socket;
  private username;
  private password;
  constructor(private http: Http) {
    this.socket = new io(this.url, { transports: ['websocket'] });
  }

  post(data) {
    console.log('In service register user : ' + JSON.stringify(data));
    this.socket.emit('register', data);
  }

  get() {

    // let data = this.http.get(this.url).map((res: Response) => res.json())
    // .catch((error: any) => Observable.throw(error.json.error || 'Server error'));
    //  console.log(data);

    let observable = new Observable(observer => {
      this.socket.on('response', (data) => {
        this.username = data;
        console.log('In service recieved response : ' + data);
                   });

      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
