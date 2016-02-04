import { Injectable } from 'angular2/core';
import { Subject, Observable } from 'rxjs';
import { Message } from '../models/message';
import { Thread } from '../models/thread';
import { User } from '../models/user';

@Injectable()
export class MessageService {
  // a stream that publishes new message only only once
  newMessages: Subject<Message> = new Subject<Message>();

  addMessage(message: Message): voic {
    this.newMessages.next(message);
  }

  messagesForThreadUser(thread: Thread, user: User): Observable<Message> {

  }
}
