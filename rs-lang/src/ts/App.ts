import router from './router';
import userLoginCheck from './userCheck';

export default class App {
  async start() {
    await userLoginCheck();
    this.enableHashChange();
  }

  enableHashChange() {
    window.addEventListener('hashchange', () => router());
    window.addEventListener('load', () => router());
  }
}
