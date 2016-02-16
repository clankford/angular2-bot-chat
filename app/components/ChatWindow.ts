import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ElementRef } from 'angular2/core';
import { FORM_DIRECTIVES } from 'angular2/common';
import { Observable } from 'rxjs';
import { ChatMessage } from './ChatMessage';
import { Thread } from '../models/thread';
import { Message } from '../models/message';
import { User } from '../models/user';
import { MessageService } from '../services/MessageService';
import { ThreadService } from '../services/ThreadService';
import { UserService } from '../services/UserService';

@Component({
  selector: 'chat-window',
  directives: [ChatMessage,
               FORM_DIRECTIVES],
  changeDetection: ChangeDetectionStrategy.OnPushObserve,
  template: `
    chat-window component
  `
})
export class ChatWindow implements OnInit {
  messages: Observable<any>;
  currentThread: Thread;
  draftMessage: Message;
  currentUser: User;

  constructor(public messageService: MessageService,
              public threadService: ThreadService,
              public userService: UserService,
              public el: ElementRef) {
  }

  ngOnInit(): void {
    this.messages = this.threadService.currentThreadMessages;

    this.draftMessage = new Message();

    this.threadService.currentThread.subscribe(
      (thread: Thread) => {
        this.currentThread = thread;
      });

    this.userService.currentUser.subscribe(
      (user: User) => {
        this.currentUser = user;
      });

    this.messages.subscribe(
      (messages: Array<Message>) => {
        setTimeout(() => {
          this.scrollToBottom();
        });
      });
  }

  sendMessage(): void {
    let m: Message = this.draftMessage;
    m.author = this.currentUser;
    m.thread = this.currentThread;
    m.isRead = true;
    this.messageService.addMessage(m);
    this.draftMessage = new Message();
  }

  onEnter(event: any): void {
    this.sendMessage();
    event.preventDefault();
  }

  scrollToBottom(): void {
    let scrollPane: any = this.el
      .nativeElement.querySelector('.msg-container-base');
    scrollPane.scrollTop = scrollPane.scrollHeight;
  }
}
