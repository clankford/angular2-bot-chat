import {
  Component
} from 'angular2/core';
import { bootstrap } from 'angular2/platform/browser';

/*
 * Webpack
 */
require('./css/styles.scss');

@Component({
  selector: 'app',
  template: `
    Chat client coming soon!!
  `
})
export class App {
  constructor() {
    console.log('Chat client coming soon!');
  }
}

bootstrap(App);
