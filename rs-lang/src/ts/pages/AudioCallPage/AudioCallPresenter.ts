import { Statistics } from './../../common/wordInterfaces';
import { Words } from "../../common/wordInterfaces";
import { updateWordFails, updateWordWins } from "../StatisticsPage/wordStats";
import AudioCallModel from "./AudioCallModel";
import AudioCallView from "./AudioCallView";

export default class AudioCallPresenter {
    private questionsPerLevel: number = 10;
    model: AudioCallModel  = new AudioCallModel();
    view: AudioCallView;
    
    answers: Words = [];

    constructor(view: AudioCallView) {
      this.view = view;
    }

    async createQuiz(level: string, page:string) {
      if (level === '6') {
        await this.model.getHardWords();
      } else {
        await this.model.getWords(level, page);
      }
      await this.renderAnswers()
    }

    async createNextQuestion() {
      if (this.model.rightAnswers.length < this.questionsPerLevel) { 
        await this.renderAnswers();
      } else {
        this.view.showResult();
      }
    }

    async sendStatistics(statistics: Statistics) {
      await this.model.updateUserStatistics(statistics);
    }

    async renderAnswers() {
      const answers = this.model.getAnswers();
      const rightAnswer = this.model.rightAnswers[this.model.rightAnswers.length -1];
      await this.view.displayAnswers(answers, rightAnswer);
    }

    onWordWin(wordId: string) {
      updateWordWins(wordId, 'audiocall');
    }

    onWordFail(wordId: string) {
      updateWordFails(wordId, 'audiocall');
    }
}
