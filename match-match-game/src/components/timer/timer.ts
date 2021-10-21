import './timer.scss';

import { BaseComponent } from '../../controls/base-component';

import { render } from '../../controls/control';

export class Timer extends BaseComponent {
  static stopTimer(): void {
    throw new Error('Method not implemented.');
  }

  readonly timerView: BaseComponent;

  currentTime = 0;

  time = 0;

  constructor() {
    super('div', ['timer']);
    this.timerView = new BaseComponent('span', ['time']);
  }

  timer(): void {
    const tim = Math.floor(this.currentTime / 60);
    const dec = this.currentTime % 60;
    const min = tim < 10 ? `0${tim}` : tim;
    const sec = dec < 10 ? `0${dec}` : dec;
    render(this.element, [this.timerView.element], `${min}:${sec}`);
    this.currentTime++;
  }

  startTimer(): void {
    this.timer();
    this.time = window.setInterval(() => this.timer(), 1000);
  }

  stopTimer(): void {
    clearInterval(this.time);
    this.time = 0;
  }
}
