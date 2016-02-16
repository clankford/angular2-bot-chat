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
    <div class="chat-window-container">
      <div class="chat-window">
        <div class="panel-container">
          <div class="panel panel-default">

            <div class="panel-heading top-bar">
              <div class="panel-title-container">
                <h3 class="panel-title">
                  <span class="glyphicon glyphicon-comment"></span>
                  Chat - {{currentThread.name}}
                </h3>
              </div>
              <div class="panel-buttons-container">
                <!-- you could minimize or close buttons here -->
              </div>
            </div>

            <div class="panel-body msg-container-base">
              <chat-message
                *ngFor="#message of messages | async"
                [message]="message">
              </chat-message>
            </div>

            <div class="panel-footer">
              <div class="input-group">
                <input type="text"
                       class="chat-input"
                       placeholder="Write your message here..."
                       (keydown.enter)="onEnter($event)"
                       [(ngModel)]="draftMessage.text" />
                <span class="input-group-btn">
                  <button class="btn-chat"
                    (click)="onEnter($event)">
                    Send
                  </button>
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
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
