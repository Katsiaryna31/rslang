import Component from "../../common/Component";
import Page from "../../common/Page";
import AudioCallView from "./AudioCallView";
import LevelChoice from "./LevelChoice";

export class AudioCallPage extends Page {
    currentLevel: string;
    currentPage:string;

    constructor(currentLevel: string = 'any', currentPage:string = 'any') {
      super();
      this.currentLevel = currentLevel;
      this.currentPage = currentPage;
    }

    render() {
      document.body.className = 'body body_level3';
      const pageWrapper = new Component('div', 'audiocall-wrapper', '').node;
      const page = new Component('div', 'audiocall', '').node;
      pageWrapper.append(page);
      const pageContainer = new Component('div', 'audiocall-container', '');
      const pageContainerElement = pageContainer.node;
      const header = new Component('p', 'game-header', 'Аудиовызов').node;
      pageContainerElement.append(header);
      const text = new Component('p', 'audiocall-text', 'Тренировка улучшает восприятие речи на слух.').node;
      pageContainerElement.append(text);
      
      const startButton = new Component('button', 'audiocall-start', 'Начать').node;
   
      startButton.addEventListener('click', async () => {
        pageContainer.destroy();
        if (this.currentLevel === 'any') {
          const levelChoicePage = new LevelChoice().node;
          page.append(levelChoicePage);
        } else {
          let audioCallView = new AudioCallView();
          await audioCallView.startQuiz(this.currentLevel, this.currentPage);
        }
      });
      pageContainerElement.append(startButton);
      page.append(pageContainerElement);

      return pageWrapper;
    }  
  }
  
  export default new AudioCallPage();