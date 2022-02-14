import Component from "../../common/Component";
import Page from "../../common/Page";
import SprintLevel from "./SprintLevel";

export class AudioCallPage extends Page {
    currentLevel: string | undefined;

    constructor( currentLevel: string | undefined = undefined) {
      super();
      this.currentLevel = currentLevel;
    }

    render() {
      document.body.className = 'body body_level4';
      const page = new Component('div', 'sprint', '').node;
      const pageContainer = new Component('div', 'sprint-container', '');
      const gameContainer = new Component('div', 'sprint-container', '').node;
      page.append(gameContainer);
      const card = new Component('div', 'card', '').node;
      gameContainer.append(card);
      const gameTitle = new Component('h5', 'game-title', 'Игра спринт').node;
      card.append(gameTitle);

      const startButton = new Component('button', 'audiocall-start', 'Начать').node;
      startButton.addEventListener('click', async () => {
        pageContainer.destroy();
        if (this.currentLevel === undefined) {
          const levelChoicePage = new SprintLevel().node;
          page.append(levelChoicePage);
        } else {
          //let audioCallView = new AudioCallView();
          //await audioCallView.startQuiz(this.currentLevel);
        }
      })
      card.append(startButton)
      return page;
    }  
  }
  
  export default new AudioCallPage();