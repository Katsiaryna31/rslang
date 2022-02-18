import { audioStart } from "../../common/utils";
import { Words } from "../../common/wordInterfaces";
import SprintModel from "./SprintModel";
import SprintView from "./SprintView";

export default class SprintPresenter {
  private questionsPerLevel: number = 10;
  level:string = 'any';
  page:string = 'any'
  model: SprintModel  = new SprintModel();
  view: SprintView;
  
  answers: Words = [];

  constructor(view: SprintView) {
    this.view = view;
  }

  playSound(numberWordsEng: number) {
    this.model.playAudio(numberWordsEng);  
  }

  endGame(){
    this.view.renderResultsPage(this.model.arrayTranscr);
    this.playSound(this.view.numberWordsEng);
  }

  async addQuestion() {
    await this.model.makeQuestionsArray(this.level, this.page);
  }

  timer = () => {
    let sec: number = 61;
    let timeT = <HTMLParagraphElement>document.querySelector('.timer');
    let sec_timer = setInterval(() => {
        if(sec > 0){
            sec--;
        } else {
            clearInterval(sec_timer);
            this.endGame()  
        }
        if (sec < 10) {
          timeT.innerHTML = `0${sec}`;
        } else {
          timeT.innerHTML = `${sec}`;
        }
        return sec;
    }, 1000);
}

  async createQuiz(level: string, page: string) {
    this.level = level;
    this.page = page;
    await this.model.makeQuestionsArray(this.level, this.page);
    audioStart()
    this.view.renderSprint(this.model.arrayEng, this.model.arrayRus);
    this.timer();
    
  }
  
}
