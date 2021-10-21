import './final.scss';
import { BaseComponent } from '../../controls/base-component';
import { render } from '../../controls/control';

export class CongratsModal extends BaseComponent {
  congratsModalText: BaseComponent;

  congratsModalButtons: BaseComponent;

  congratsModalButtonSucces: BaseComponent;

  congratsModalButtonCansel: BaseComponent;

  registerModalSend!: BaseComponent;

  constructor() {
    super('div', ['modal-container']);
    this.congratsModalText = new BaseComponent('p', ['modal-text']);
    this.congratsModalButtons = new BaseComponent('div', ['congrats-buttons-container']);
    this.congratsModalButtonSucces = new BaseComponent('button', ['button-congrats']);
    this.congratsModalButtonCansel = new BaseComponent('button', ['button-congrats']);
  }

  renderTemplate(): void {
    const time = document.querySelector('.time')?.innerHTML;
    render(this.congratsModalButtons.element, [this.congratsModalButtonSucces.element], 'ok');
    render(this.congratsModalButtons.element, [this.congratsModalButtonCansel.element], 'cansel');
    render(
      this.element,
      [this.congratsModalText.element],
      `Congratulations! You successfully found all matches on ${time} minutes.`,
    );
    render(this.element, [this.congratsModalButtons.element]);
  }
}
