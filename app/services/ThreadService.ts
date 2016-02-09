import { Injectable, bind } from 'angular2/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Thread } from '../models/thread';
import { Message } from '../models/message';
import { MessageService } from './MessageService';
import * as _ from 'underscore';

@Injectable()
export class ThreadSevice {
  // 'threads' is an observable that contains the most up to date list of threads
  threads: Observable<{ [key: string]: Thread }>;

  constructor(public messageService: MessageService) {

    this.threads = messageService.messages
      .map( (messages: Message[]) => {
        let threads: {[key: string]: Thread} = {};
        // Store the message's thread in our accumulator `threads`
        messages.map((message: Message) => {
          threads[message.thread.id] = threads[message.thread.id] ||
            message.thread;

          // Cache the most recent message for each thread
          let messagesThread: Thread = threads[message.thread.id];
          if (!messagesThread.lastMessage ||
              messagesThread.lastMessage.sentAt < message.sentAt) {
            messagesThread.lastMessage = message;
          }
        });
        return threads;
      });
  }
}
