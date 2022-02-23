import router from './router';
import authorization from './authorization';

export default class App {
  async start() {
    await authorization();
    this.enableHashChange();
    this.enableMenu();
    router();
  }

  enableHashChange() {
    window.addEventListener('hashchange', () => router());
  }

  enableMenu() {
    const menuBtn = <HTMLElement>document.querySelector('#burger');
    const menu = <HTMLElement>document.querySelector('#nav');
    menuBtn.onclick = () => {
      menu.classList.toggle('open');
      document.body.classList.toggle('overflow-hidden');
    }

    document.addEventListener('click', (e) => {
      if (e.target instanceof HTMLElement && !(e.target.closest('#burger')) && (e.target !== menu)) {
        menu.classList.remove('open');
        document.body.classList.remove('overflow-hidden');
      }
    })
  }
}