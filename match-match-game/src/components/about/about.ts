import './about.scss';
import { BaseComponent } from '../../controls/base-component';

export class AboutGame extends BaseComponent {
  constructor() {
    super('div', ['about-game-page']);
    this.element.innerHTML = `
    <div class='instructions-field'>
      <div class='instruction-container'>
        <div class='instruction-content'>
          <p class='instruction-text'>Start you new game! Remember card positions and match it before times up.</p>
        </div>
        <div class='about-img about-img__3'></div>
      </div>
    </div>
    `;
  }
}
