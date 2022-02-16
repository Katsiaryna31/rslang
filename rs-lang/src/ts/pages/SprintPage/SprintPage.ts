import Component from "../../common/Component";
import Page from "../../common/Page";
import SprintLevel from "./SprintLevel";
import SprintView from "./SprintView";

export class SprintPage extends Page {
  currentLevel: string;
  currentPage:string;

    constructor( currentLevel: string = 'any', currentPage:string = 'any') {
      super();
      this.currentLevel = currentLevel;
      this.currentPage = currentPage;
    }

    render() {
      document.body.className = 'body body_level4';
      const pageWrapper = new Component('div', 'sprint-wrapper', '').node;
      const page = new Component('div', 'sprint', '').node;
      pageWrapper.append(page);
      const pageContainer = new Component('div', 'sprint-container', '');
      const gameContainer = pageContainer.node;
      page.append(gameContainer);
      const card = new Component('div', 'card', '').node;
      gameContainer.append(card);
      const gameTitle = new Component('h5', 'game-header', 'Спринт').node;
      card.append(gameTitle);

      const startButton = new Component('button', 'audiocall-start', 'Начать').node;
      startButton.addEventListener('click', async () => {
        pageContainer.destroy();
        if (this.currentLevel === 'any') {
          const levelChoicePage = new SprintLevel().node;
          page.append(levelChoicePage);
        } else {
          let sprintView = new SprintView();
          await sprintView.startQuiz(this.currentLevel, this.currentPage);
        }
      })
      card.append(startButton)
      return pageWrapper;
    }  
  }
  
  export default new SprintPage();