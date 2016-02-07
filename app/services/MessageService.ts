import { Injectable, bind } from 'angular2/core';
import { Subject, Observable } from 'rxjs';
import { Message } from '../models/message';
import { Thread } from '../models/thread';
import { User } from '../models/user';

let initialMessages: Message[] = [];

interface IMessagesOperation extends Function {
  (messages: Message[]): Message[];
}

@Injectable()
export class MessageService {
  // a stream that publishes new message only only once
  newMessages: Subject<Message> = new Subject<Message>();
  // a stream that emits an array of the most up to date messages
  messages: Observable<Message[]>;
  // a stream that receives operations to be applied to our messages
  // acts as a way to perform changes on all messages currently stored in
  // the messages stream
  updates: Subject<any> = new Subject<any>();
  // action streams
  create: Subject<Message> = new Subject<Message>();
  markThreadAsRead: Subject<any> = new Subject<any>();

  constructor() {
    this.messages = this.updates
      // watch the updates and accumulate operations on the messages
      .scan((messages: Message[],
             operation: IMessagesOperation) => {
               return operation(messages);
             },
            initialMessages)
      // shares the most recent list of messages across anyone who's interested
      // in subscribing and cache the last known list of messages
      .publishReplay(1)
      .refCount();

    this.create
      .map( function(message: Message): IMessagesOperation {
        return (messages: Message[]) => {
          return messages.concat(message);
        };
      })
      .subscribe(this.updates);

    this.newMessages
      .subscribe(this.create);

    this.markThreadAsRead
      .map( (thread: Thread) => {
        return (messages: Message[]) => {
          return messages.map( (message: Message) => {
            if (message.thread.id === thread.id) {
              message.isRead = true;
            }
            return message;
          });
        };
      })
      .subscribe(this.updates);
  }

  addMessage(message: Message): void {
    this.newMessages.next(message);
  }

  messagesForThreadUser(thread: Thread, user: User): Observable<Message> {
    return this.newMessages
      .filter((message: Message) => {
        // belongs to this thread
        return (message.thread.id === thread.id) &&
        // and isn't authored by this user
               (message.author.id !== user.id);
    });
  }
}

export var messagesServicesInjectables: Array<any> = [
  bind(MessageService).toClass(MessageService)
];
