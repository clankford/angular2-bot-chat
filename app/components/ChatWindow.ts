import { Component, ChangeDetectionStrategy } from 'angular2/core';
import { FORM_DIRECTIVES } from 'angular2/common';
import { Observable } from 'rxjs';
import { ChatMessage } from './ChatMessage';
import { Thread } from '../models/thread';
import { Message } from '../models/message';
import { User } from '../models/user';

@Component({
  selector: 'chat-window',
  directives: [ChatMessage,
               FORM_DIRECTIVES],
  changeDetection: ChangeDetectionStrategy.OnPushObserve,
  template: `
    chat-window component
  `
})
export class ChatWindow {
  messages: Observable<any>;
  currentThread: Thread;
  draftMessage: Message;
  currentUser: User;
}
