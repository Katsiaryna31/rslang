import Component from "../../templates/Component";
import PageTemplate from "../../templates/Page";

class HomePage extends PageTemplate {
  
  render() {
    document.body.className = 'body';
    return new Component('p', '', 'Home page').node;
  }
  
}

export default new HomePage();