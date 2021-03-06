import './game.scss';
import { BaseComponent } from '../controls/base-component';
import { delay } from '../shared/delay';
import { Card } from './card/card';
import { CardsField } from './cards-field/cards-field';
import { ImageCategoryModel } from './models/image-category-model';
import { Timer } from './timer/timer';
//import { Modal } from './popup/popup';

const FLIP_DELAY = 500;

let GAME_TIME = '';

export class Game extends BaseComponent {
  private readonly cardsField: CardsField;

  private readonly timer: Timer;

  private activeCard?: Card;

  private isAnimation = false;

  private gameCounter = 0;

  private fieldSize = 0;

  //modal: Modal;

  constructor() {
    super('div', ['game-page']);
    this.timer = new Timer();
    this.cardsField = new CardsField();
    //this.modal = new Modal();
    this.element.appendChild(this.timer.element);
    this.element.appendChild(this.cardsField.element);
  }

  newGame(images: string[]): void {
    this.cardsField.clearCards();
    this.fieldSize = images.length;
    const cards = images
      .concat(images)
      .map(url => new Card(url))
      .sort(() => Math.random() - 0.5);
    cards.forEach(card => {
      card.element.addEventListener('click', () => this.cardHandler(card));
    });
    this.cardsField.addCards(cards);
    this.timer.startTimer();
  }

  private async cardHandler(card: Card, fieldSize = 8) {
    if (this.isAnimation) return;
    if (!card.isFlipped) return;
    this.isAnimation = true;
    await card.flipToFront();
    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }
    if (this.activeCard.image !== card.image) {
      await delay(FLIP_DELAY);
      await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
    } else {
      this.gameCounter++;
      if (this.gameCounter === fieldSize) {
        GAME_TIME = this.timer.timerView.element.innerHTML;
        this.stop();
      }
    }
    this.activeCard = undefined;
    this.isAnimation = false;
  }

  async start(): Promise<void> {
    const res = await fetch('./images.json');
    const categories: ImageCategoryModel[] = await res.json();
    const cat = categories[0]; // first object of images.json
    const images = cat.images.map(name => `${cat.category}/${name}`);
    this.newGame(images);
  }

  stop(): void {
    this.timer.stopTimer();
  }
}
