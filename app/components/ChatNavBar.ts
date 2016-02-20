import { Component } from 'angular2/core';
import { MessageService } from '../services/MessageService';
import { ThreadService } from '../services/ThreadService';
import { Message } from '../models/message';
import { Thread } from '../models/thread';
import * as _ from 'underscore';

@Component({
  selector: 'nav-bar',
  template: `
    nav-bar component
  `
})
export class ChatNavBar {
  unreadMessagesCount: number;

  constructor(public messageService: MessageService,
              public threadService: ThreadService) {
  }

  ngOnInit(): void {
    this.messageService.messages
      .combineLatest(
        this.threadService.currentThread,
        (messages: Message[], currentThread: Thread) =>
          [currentThread, messages] )

      .subscribe(([currentThread, messages]: [Thread, Message[] ]) => {
        this.unreadMessagesCount =
          _.reduce(
            messages,
            (sum: number, m: Message) => {
              let messageIsInCurrentThread: boolean = m.thread &&
                currentThread &&
                (currentThread.id === m.thread.id);
                if (m && !m.isRead && !messageIsInCurrentThread) {
                  sum = sum + 1;
                }
                return sum;
              },
              0);
      });
  }
}
