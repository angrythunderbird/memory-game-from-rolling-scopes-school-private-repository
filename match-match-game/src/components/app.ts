import { BaseComponent } from '../controls/base-component';
import { render } from '../controls/control';
import { AboutGame } from './about/about';
import { Button } from './button/button';
import { Navigation } from './menu/menu';
import { DefaultPage } from './default/default';
import { Game } from './game';

export class App {
  navigation: Navigation;

  button: Button;

  aboutGame: AboutGame;

  defaultPage: DefaultPage;

  baseLayout: HTMLElement[];

  game: Game;

  route?: HTMLElement;

  component?: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    this.game = new Game();
    this.navigation = new Navigation();
    this.button = new Button();
    this.aboutGame = new AboutGame();
    this.defaultPage = new DefaultPage();
    this.baseLayout = App.createBaseLayout();
    render(rootElement, this.baseLayout);
    this.locationResolver(window.location.hash);
    window.onpopstate = () => {
      const path = window.location.hash;
      if (path) {
        this.locationResolver(path);
      }
    };
  }

  static createBaseLayout(): HTMLElement[] {
    const header = new BaseComponent('header', ['header']);
    const main = new BaseComponent('main', ['main']);
    return [header.element, main.element];
  }

  locationResolver(hash: string): void {
    switch (hash) {
      case '#/about':
        render(this.baseLayout[0], [this.navigation.element]);
        this.removeActiveRoute();
        this.addActiveRoute(this.navigation.links[0].element);
        this.adjustСontent();
        this.clearContent(this.baseLayout[1]);
        render(this.baseLayout[1], [this.aboutGame.element]);
        break;
      case '#/game':
        render(this.baseLayout[0], [this.navigation.element]);
        this.removeActiveRoute();
        this.addActiveRoute(this.navigation.links[3].element);
        render(this.baseLayout[0], [this.button.element], 'start game');
        this.clearContent(this.baseLayout[1]);
        render(this.baseLayout[1], [this.defaultPage.element], 'To start the game click START GAME');
        this.gameHandler();
        break;
      default:
        render(this.baseLayout[0], [this.navigation.element]);
        this.clearContent(this.baseLayout[1]);
        render(this.baseLayout[1], [this.aboutGame.element]);
    }
  }

  gameHandler(): void {
    this.button.element.addEventListener('click', () => {
      if (this.button.element.innerHTML === 'start game') {
        this.clearContent(this.baseLayout[1]);
        render(this.baseLayout[1], [this.game.element]);
        this.game.start();
        this.button.element.innerHTML = 'stop game';
      } else {
        this.clearContent(this.baseLayout[1]);
        render(this.baseLayout[1], [this.defaultPage.element], 'To start the game click START GAME');
        this.button.element.innerHTML = 'start game';
        this.game.stop();
      }
    });
  }

  addActiveRoute(el: HTMLElement): void {
    this.route = el;
    this.route.classList.add('nav-link__active');
  }

  removeActiveRoute(): void {
    this.navigation.links.forEach(el => {
      el.element.classList.remove('nav-link__active');
    });
  }

  adjustСontent(): void {
    if (this.baseLayout[0].contains(this.button.element)) {
      this.baseLayout[0].removeChild(this.button.element);
    }
  }

  clearContent(el: HTMLElement): void {
    this.component = el;
    this.component.innerHTML = '';
  }
}
