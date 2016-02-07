import { User } from '../../app/models/user';
import { Thread } from '../../app/models/thread';
import { Message } from '../../app/models/message';
import { MessageService } from '../../app/services/MessageService';

describe('MessageService', () => {
  it('should test', () => {

    let user: User = new User('Chris', '');
    let thread: Thread = new Thread('thread1', 'Chris', '');
    let m1: Message = new Message({
      author: user,
      text: 'Hi!',
      thread: thread
    });

    let m2: Message = new Message({
      author: user,
      text: 'Bye!',
      thread: thread
    });

    let messageService: MessageService = new MessageService();

    // listen to each message individually as it comes in
    messageService.newMessages
      .subscribe( (message: Message) => {
        console.log('=> newMessages: ' + message.text);
      });

    // listen to the stream of most current messages
    messageService.messages
      .subscribe( (messages: Message[]) => {
        console.log('=> messages: ' + messages.length);
      });

    messageService.addMessage(m1);
    messageService.addMessage(m2);

    // => messages: 1
    // => newMessages: Hi!
    // => messages: 2
    // => newMessages: Bye!
  });
});
