import { Injectable, bind } from 'angular2/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Thread } from '../models/thread';
import { Message } from '../models/message';
import { MessageService } from './MessageService';
import * as _ from 'underscore';

@Injectable()
export class ThreadService {
  // 'threads' is an observable that contains the most up to date list
  // of threads
  threads: Observable<{ [key: string]: Thread }>;
  // 'orderedThreads' contains a newest-first chronological list of threads
  orderedThreads: Observable<Thread[]>;
  // 'currentThread' contains the currently selected thread
  currentThread: Subject<Thread> = new BehaviorSubject<Thread>(new Thread());
  // 'currentThreadMessages' contains the set of messages for the currently
  // selected thread
  currentThreadMessages: Observable<Message[]>;

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

    this.orderedThreads = this.threads
      .map((threadGroups: { [key: string]: Thread }) => {
        let threads: Thread[] = _.values(threadGroups);
        return _.sortBy(threads, (t: Thread) => t.lastMessage.sentAt).reverse();
      });

    this.currentThreadMessages = this.currentThread
      .combineLatest(messageService.messages,
                     (currentThread: Thread, messages: Message[]) => {
        if (currentThread && messages.length > 0) {
          return _.chain(messages)
            .filter((message: Message) =>
                    (message.thread.id === currentThread.id))
            .map((message: Message) => {
              message.isRead = true;
              return message; })
            .value();
        } else {
          return [];
        }
      });

    this.currentThread.subscribe(this.messageService.markThreadAsRead);
  }

  setCurrentThread(newThread: Thread): void {
    this.currentThread.next(newThread);
  }
}

export var threadServiceInjectibles: Array<any> = [
  bind(ThreadService).toClass(ThreadService)
];
