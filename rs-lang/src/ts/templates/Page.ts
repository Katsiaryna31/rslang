export default abstract class PageTemplate {
  protected container: HTMLElement;

  constructor() {
    this.container = document.createElement('div');
  }

  render() {
    return this.container;
  }
}
