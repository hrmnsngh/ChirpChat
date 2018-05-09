import { Component, OnInit } from '@angular/core';
import { ChatService } from '../Services/chat.service';
import { RevievedMessage } from '../model/RecievedMessage';
import { getLocaleDateFormat } from '@angular/common';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [ChatService]
})
export class ChatComponent implements OnInit {


  messages = [];
  message;
  connection;
  users = [];
  rightMsg: Boolean = false;
  sentUsername;
  history: Boolean = false;
  userNameExist = false;
  canSendMsg = false;
  constructor(private chatService: ChatService) { }

  sendUser() {
    this.chatService.sendUser(this.sentUsername);
  }

  sendMessage() {
    this.chatService.sendMessages(this.message);
    console.log(this.message);
    this.message = '';

  }

  getMessages() {
    this.chatService.getMessages().subscribe(data => {
      this.messages.push(data);
      this.history = true;
      console.log(data['username']);
      if (this.sentUsername === data['user']) {
        this.rightMsg = true;
      } else {
        this.rightMsg = false;
      }

      // console.log('In ts get msgs' + data);
      // console.log(this.messages);
    });
  }

  getUsers() {
    this.chatService.getUsers().subscribe(username => {
      console.log('in component getusers ' + username);
      if (username === '-1') {
        this.userNameExist = true;
        // console.log('username exists');
        this.canSendMsg = false;
      } else {
        this.canSendMsg = true;
        this.userNameExist = false;
        this.users.push(username);
        // console.log('username doesnt exist');
      }
    });

  }

  resetUser() {
    this.userNameExist = false;
  }

  ngOnInit() {
    this.getUsers();
    this.getMessages();
  }
  OnDestroy() {
    this.connection.unsubscribe();
  }

}
