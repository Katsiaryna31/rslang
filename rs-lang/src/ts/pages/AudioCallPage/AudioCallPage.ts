import Component from "../../common/Component";
import Page from "../../common/Page";
import AudioCallPresenter from "./AudioCallPresenter";
import LevelChoice from "./LevelChoice";

export class AudioCallPage extends Page {
    currentLevel: string | undefined;

    constructor( currentLevel: string | undefined = undefined) {
      super();
      this.currentLevel = currentLevel;
    }

    render() {
      document.body.className = 'body body_level3';
      const page = new Component('div', 'audiocall', '').node;

      const pageContainer = new Component('div', 'audiocall-container', '');
      const pageContainerElement = pageContainer.node;
      const header = new Component('p', 'audiocall-header', 'Аудиовызов').node;
      pageContainerElement.append(header);
      const text = new Component('p', 'audiocall-text', 'Тренировка улучшает восприятие речи на слух.').node;
      pageContainerElement.append(text);
      
      const startButton = new Component('button', 'audiocall-start', 'Начать').node;
      startButton.addEventListener('click', () => {
        pageContainer.destroy();
        if (this.currentLevel === undefined) {
          const levelChoicePage = new LevelChoice().node;
          page.append(levelChoicePage);
        } else {
          let audioCallPresenter = new AudioCallPresenter(this.currentLevel);
          audioCallPresenter.sendAnswers();
        }
      })
      pageContainerElement.append(startButton);
      page.append(pageContainerElement)
      return page;
    }  
  }
  
  export default new AudioCallPage();