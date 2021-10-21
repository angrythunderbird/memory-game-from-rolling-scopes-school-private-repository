import './styles.scss';
import { App } from './components/app';

window.onload = () => {
  const appElement = document.getElementById('root');

  if (!appElement) throw Error('App root element not found');

  return new App(appElement);
};
