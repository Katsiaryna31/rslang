import AudioCallModel from "./AudioCallModel";
import AudioCallView from "./AudioCallView";

export interface Word {
  "id": string,
  "group": number,
  "page": number,
  "word": string,
  "image": string,
  "audio": string,
  "audioMeaning": string,
  "audioExample": string,
  "textMeaning": string,
  "textExample": string,
  "transcription": string,
  "wordTranslate": string,
  "textMeaningTranslate": string,
  "textExampleTranslate": string
};

export interface Words extends Array<Word>{};

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