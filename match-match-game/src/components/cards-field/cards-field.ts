import './cards-field.scss';
import { BaseComponent } from '../../controls/base-component';
import { Card } from '../card/card';

const SHOW_TIME = 3000;

export class CardsField extends BaseComponent {
  private cards: Card[] = [];

  constructor() {
    super('div', ['cards-field']);
  }

  clearCards(): void {
    this.cards = [];
    this.element.innerHTML = '';
  }

  addCards(cards: Card[]): void {
    this.cards = cards;
    this.cards.forEach(card => this.element.appendChild(card.element));
    setTimeout(() => {
      this.cards.forEach(card => card.flipToBack());
    }, SHOW_TIME);
  }
}
