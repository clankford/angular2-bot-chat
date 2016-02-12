import { Component, ChangeDetectionStrategy } from 'angular2/core';
import { Observable } from 'rxjs';
import { ThreadService } from '../services/ThreadService';
import { ChatThread } from './ChatThread';

@Component({
  selector: 'chat-threads',
  directives: [ChatThread],
  changeDetection: ChangeDetectionStrategy.OnPushObserve,
  template: `
    <!-- conversations -->
    <div class="row">
      <div class="conversation-wrap">

        <chat-threads
            *ngFor="#thread of threads | async"
            [thread]="thread">
        </chat-thred>

      </div>
    </div>
  `
})
export class ChatThreads {
  threads: Observable<any>;

  constructor(public threadService: ThreadService) {
    this.threads = threadService.orderedThreads;
  }
}
