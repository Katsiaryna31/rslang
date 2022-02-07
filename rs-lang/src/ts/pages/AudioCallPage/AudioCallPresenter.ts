import AudioCallModel, { Words } from "./AudioCallModel";
import AudioCallView from "./AudioCallView";



export default class AudioCallPresenter {
    level:string = '';
    view = new AudioCallView();
    model: AudioCallModel  = new AudioCallModel();
    
    answers: Words = [];
  

    constructor(level: string) {
      this.level = level;
    }

    async getData() {
      await this.model.getWords(this.level);
    }

    sendAnswers() {
      this.view.displayAnswers(this.model.getAnswers());
    }
}