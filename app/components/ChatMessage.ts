import { Component } from 'angular2/core';
import { FromNowPipe } from '../util/FromNowPipe';

@Component({
  selector: 'chat-message',
  inputs: ['message'],
  pipes: [FromNowPipe],
  template: `
    chat-message template
  `
})
export class ChatMessage {

}
