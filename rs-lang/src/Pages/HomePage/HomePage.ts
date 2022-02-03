import Component from "../../core/templates/Component";
import PageTemplate from "../../core/templates/Page";

class HomePage extends PageTemplate {
  
  render() {
    document.body.className = 'body';
    return new Component('p', '', 'Home page').node;
  }
  
}

export default new HomePage();