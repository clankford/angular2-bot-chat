import { Component } from 'angular2/core';
import { bootstrap } from 'angular2/platform/browser';
import { ChatNavBar } from './components/ChatNavBar';
import { ChatThreads } from './components/ChatThreads';
import { ChatWindow } from './components/ChatWindow';
import { MessageService } from './services/MessageService';
import { ThreadService } from './services/ThreadService';
import { UserService } from './services/UserService';
import { servicesInjectables } from './services/services';
import { utilInjectables } from './util/util';
import { ChatExampleData } from './ChatExampleData';

/*
 * Webpack
 */
require('./css/styles.scss');

@Component({
  selector: 'app',
  directives: [ChatNavBar,
               ChatThreads,
               ChatWindow],
  template: `
    <div>
      <nav-bar></nav-bar>
      <div class="container">
        <chat-threads></chat-threads>
        <chat-window></chat-window>
      </div>
    </div>
  `
})
export class App {
  constructor(public messageService: MessageService,
              public threadService: ThreadService,
              public userService: UserService) {
    ChatExampleData.init(messageService, threadService, userService);
  }
}

bootstrap(App, [ servicesInjectables, utilInjectables ]);
