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

export interface Optional {
  "wins": string,
  "fails":string
}

export interface Words extends Array<Word>{};

export default class AudioCallPresenter {
    private questionsPerLevel: number = 10;
    model: AudioCallModel  = new AudioCallModel();
    view: AudioCallView;
    
    answers: Words = [];

    constructor(view: AudioCallView) {
      this.view = view;
    }

    async createQuiz(level: string, page:string) {
      await this.model.getWords(level, page);
      await this.renderAnswers()
    }

    async createNextQuestion() {
      if (this.model.rightAnswers.length < this.questionsPerLevel) { 
        await this.renderAnswers();
      } else {
        this.view.showResult();
      }
    }

    async renderAnswers() {
      const answers = this.model.getAnswers();
      const rightAnswer = this.model.rightAnswers[this.model.rightAnswers.length -1];
      await this.view.displayAnswers(answers, rightAnswer);
    }

    async wordStatisticUpdate(wordId: string, optional:Optional) {
      const wordData = await this.model.getUserWord(wordId);
      if (!wordData) {
        await this.model.createUserWord(wordId, optional);
      } else {
        await this.model.updateUserWord(wordId, optional);
      }
    }
}