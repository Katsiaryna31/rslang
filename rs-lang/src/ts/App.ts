import router from './router';
import authorization from './authorization';

export default class App {
  async start() {
    await authorization();
    this.enableHashChange();
    router();
  }

  enableHashChange() {
    window.addEventListener('hashchange', () => router());
  }
}
