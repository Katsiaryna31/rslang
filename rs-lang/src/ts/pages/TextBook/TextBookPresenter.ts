import { FILES_LINK, LocalStorageKey } from "../../settings";
import { TextBookPage, textbookSettings } from "./TextBook";
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
    this.view.gameSelect.disabled = false; 
    this.view.displayWords(data);
  }

  async onHardWordsPageSelect() {
    const data = await this.model.getHardWords();
    this.view.gameSelect.disabled = data.length ? false : true; 
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

  async checkCurrentPage() {
    if (!localStorage.getItem(LocalStorageKey.id)) return;
    const learnedAndHardWords = await this.model.getLearnedAndHardWords(this.view.pageNum - 1, this.view.groupNum - 1);
    const listItem = this.view.pagesArr[this.view.pageNum - 1];
    if (learnedAndHardWords.length === 20) {
      this.view.fullPageSign.classList.add('active');
      this.view.gameSelect.disabled = true;
      listItem.classList.add('learned');
    } else {
      this.view.fullPageSign.classList.remove('active');
      this.view.gameSelect.disabled = false;
      listItem.classList.remove('learned');
    }
  }

  async checkPagesList() {
    if (!localStorage.getItem(LocalStorageKey.id)) return;
    textbookSettings.pages.forEach(async (pageNum) => {
      const learnedAndHardWords = await this.model.getLearnedAndHardWords(pageNum - 1, this.view.groupNum - 1);
      const listItem = this.view.pagesArr[pageNum - 1];
      if (learnedAndHardWords.length === 20) {
        listItem.classList.add('learned');
      } else {
        listItem.classList.remove('learned');
      }
    })
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