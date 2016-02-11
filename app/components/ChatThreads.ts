import { Component } from 'angular2/core';
import { Observable } from 'rxjs';
import { ThreadService } from '../services/ThreadService';

@Component({
  selector: 'chat-threads',
  template: `
    chat-threads component
  `
})
export class ChatThreads {
  threads: Observable<any>;

  constructor(public threadService: ThreadService) {
    this.threads = threadService.orderedThreads;
  }
}
