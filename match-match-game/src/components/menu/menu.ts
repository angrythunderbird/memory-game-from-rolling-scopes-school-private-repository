import './menu.scss';
import { BaseComponent } from '../../controls/base-component';
import { render } from '../../controls/control';

export class Navigation extends BaseComponent {
  navigation: BaseComponent;

  navItem1: BaseComponent;

  navLink1: BaseComponent;

  navItem4: BaseComponent;

  navLink4: BaseComponent;

  links: BaseComponent[];

  constructor() {
    super('nav', ['nav']);
    this.navItem1 = new BaseComponent('li', ['nav-item']);
    this.navLink1 = new BaseComponent('a', ['nav-link']);
    this.navItem4 = new BaseComponent('li', ['nav-item']);
    this.navLink4 = new BaseComponent('a', ['nav-link']);
    this.navigation = new BaseComponent('ul', ['navigation']);
    this.links = [this.navLink1, this.navLink4];
    this.renderTemlate();
    render(this.element, [this.navigation.element]);
  }

  renderTemlate(): void {
    render(
      this.navItem1.element,
      [this.navLink1.element],
      '<div class="nav-icon nav-icon__about"></div>About Game',
      ['href'],
      ['#/about'],
    );
    render(
      this.navItem4.element,
      [this.navLink4.element],
      '<div class="nav-icon nav-icon__game"></div>New Game',
      ['href'],
      ['#/game'],
    );
    render(this.navigation.element, [
      this.navItem1.element,
      this.navItem4.element,
    ]);
  }
}
