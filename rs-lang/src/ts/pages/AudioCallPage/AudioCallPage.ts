import Component from "../../common/Component";
import Page from "../../common/Page";

export class AudioCallPage extends Page {
    render() {
      document.body.className = 'body body_level3';
      const page = new Component('div', 'audiocall', '').node;
      const pageContainer = new Component('div', 'audiocall-container', '').node;
      const header = new Component('p', 'audiocall-header', 'Аудиовызов').node;
      pageContainer.append(header);
      const text = new Component('p', 'audiocall-text', 'Тренировка улучшает восприятие речи на слух.').node;
      pageContainer.append(text);
      
      const startButton = new Component('button', 'audiocall-start', 'Начать').node;
      pageContainer.append(startButton);
      page.append(pageContainer)
     
      return page;
    }
  }
  
  export default new AudioCallPage();