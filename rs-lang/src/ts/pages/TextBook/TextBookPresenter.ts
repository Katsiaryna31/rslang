import { FILES_LINK } from "../../settings";
import { TextBookPage } from "./TextBook";
import TextBookModel, { WordData } from "./TextBookModel";

export default class TextBookPresenter {
  constructor(
    private view: TextBookPage,
    private model = TextBookModel,
    private audio = new Audio(),
  ) {
    this.view = view;
  }

  async onPageSelect(chapter: number, page: number) {
    const data = await this.model.getWords(chapter, page); 
    this.view.displayWords(data);
  }

  async onHardWordsPageSelect() {
    const data = await this.model.getHardWords();
    this.view.displayHardWords(data);
  }

  async wordDifficultyUpdate(btn: HTMLInputElement, wordId: string, newDifficultyValue: string) {
    btn.disabled = true;
    const wordData = await this.model.getUserWord(wordId);
    const word = { difficulty: newDifficultyValue };
    if (!wordData) {
      await this.model.createUserWord(wordId, word);
    } else {
      await this.model.updateUserWord(wordId, word);
    }
    btn.disabled = false;
  }

  async getHardWords() {
    const data = await this.model.getHardWords();
    return data;
  }

  async getLearnedWords() {
    const data = await this.model.getLearnedWords();
    return data;
  }

  onPlay(data: WordData) {
    const playlist = [data.audio, data.audioMeaning, data.audioExample];
    let playNum = 0;

    const playNext = () => {
      this.audio.src = `${FILES_LINK + playlist[playNum]}`;
      this.audio.play();
    }
    
    this.audio.onended = () => {
      playNum += 1;
      if (playNum <= 2) {
        playNext();
      }
    }

    playNext();
  }
}