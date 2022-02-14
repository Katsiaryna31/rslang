import { Words } from "../../common/wordInterfaces";
import AudioCallModel from "./AudioCallModel";
import AudioCallView from "./AudioCallView";

export default class AudioCallPresenter {
    private questionsPerLevel: number = 10;
    level:string = '';
    model: AudioCallModel  = new AudioCallModel();
    view: AudioCallView;
    
    answers: Words = [];

    constructor(view: AudioCallView) {
      this.view = view;
    }

    async createQuiz(level: string) {
      this.level = level
      await this.model.getWords(this.level);
      await this.sendAnswers()
    }

    async createNextQuestion() {
      if (this.model.rightAnswers.length < this.questionsPerLevel) { 
        await this.sendAnswers();
      } else {
        this.view.showResult();
      }
    }

    async sendAnswers() {
      const answers = this.model.getAnswers();
      console.log(answers)
      const rightAnswer = this.model.rightAnswers[this.model.rightAnswers.length -1];
      console.log(rightAnswer)
      await this.view.displayAnswers(answers, rightAnswer);
    }
}