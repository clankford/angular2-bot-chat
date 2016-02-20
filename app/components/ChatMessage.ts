import { Component, OnInit } from 'angular2/core';
import { FromNowPipe } from '../util/FromNowPipe';
import { Message } from '../models/message';
import { User } from '../models/user';
import { UserService } from '../services/UserService';

@Component({
  selector: 'chat-message',
  inputs: ['message'],
  pipes: [FromNowPipe],
  template: `
    <div class="msg-container"
         [ngClass]="{'base-sent': !incoming, 'base-receive': incoming}">
      <div class="avatar"
           *ngIf="!incoming">
        <img src="{{message.author.avatarSrc}}">
      </div>

      <div class="messages"
           [ngClass]="{'msg-sent': !incoming, 'msg-receive': inciming}">
        <p>{{message.text}}</p>
        <time>{{message.sender}} - {{message.sentAt | fromNow}}</time>
      </div>

      <div class="avatar"
           *ngIf="incoming">
        <img src="{{message.author.avatarSrc}}">
      </div>
    </div>
  `
})
export class ChatMessage implements OnInit {
  message: Message;
  currentUser: User;
  incoming: boolean;

  constructor(public userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.currentUser
      .subscribe( (user: User) => {
        this.currentUser = user;
        if (this.message.author && user) {
          this.incoming = this.message.author.id !== user.id;
        }
      });
  }
}
