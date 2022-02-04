import Component from '../../common/Component';
import Page from '../../common/Page';

class HomePage extends Page {
  render() {
    document.body.className = 'body';
    return new Component('p', '', 'Home page').node;
  }
}

export default new HomePage();
