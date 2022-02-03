import { router } from "./router";


export class App {

  start() {
    this.enableHashChange();
    router();
  }

  enableHashChange() {
    window.addEventListener('hashchange', () => router());
    window.addEventListener('load', () => router());
  }
}