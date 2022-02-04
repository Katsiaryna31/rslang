import Component from '../../templates/Component';
import Page from '../../templates/Page';

class HomePage extends Page {
  render() {
    document.body.className = 'body';
    return new Component('p', '', 'Home page').node;
  }
}

export default new HomePage();
