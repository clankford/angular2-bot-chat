import { messageServiceInjectables } from './MessageService';
import { threadServiceInjectibles} from './ThreadService';
import { userServiceInjectables } from './UserService';

export * from './MessageService';
export * from './ThreadService';
export * from './UserService';

export var servicesInjectables: Array<any> = [
  messageServiceInjectables,
  threadServiceInjectibles,
  userServiceInjectables
];
