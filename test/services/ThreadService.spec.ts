import { User } from '../../app/models/user';
import { Thread } from '../../app/models/thread';
import { Message } from '../../app/models/message';
import { MessageService } from '../../app/services/MessageService';
import { ThreadService } from '../../app/services/ThreadService';
import * as _ from 'underscore';

describe('ThreadService', () => {
  it('should collect the Threads from Messages', () => {

    let chris: User = new User('Chris Lankford', '');
    let ryan: User = new User('Ryan Smith', '');

    let t1: Thread = new Thread('t1', 'Thread 1', '');
    let t2: Thread = new Thread('t2', 'Thread 2', '');

    let m1: Message = new Message({
      author: chris,
      text: 'Hi!',
      thread: t1
    });

    let m2: Message = new Message({
      author: ryan,
      text: 'What are you doing this weekend?',
      thread: t1
    });

    let m3: Message = new Message({
      author: chris,
      text: 'Where are you?!',
      thread: t2
    });

    let messageService: MessageService = new MessageService();
    let threadService: ThreadService =  new ThreadService(messageService);

    threadService.threads
      .subscribe( (threadIdx: { [key: string]: Thread }) => {
        let threads: Thread[] = _.values(threadIdx);
        let threadNames: string = _.map(threads, (t: Thread) => t.name)
                                   .join(', ');
        console.log(`=> threads (${threads.length}): ${threadNames}`);
      });

      messageService.addMessage(m1);
      messageService.addMessage(m2);
      messageService.addMessage(m3);

    // => threads (1): Thread 1
    // => threads (1): Thread 1
    // => threads (2): Thread 1, Thread 2

  });
});
