import Component from "../../common/Component";
import Page from "../../common/Page";
import { LocalStorageKey } from "../../settings";
import { WordData } from "./TextBookModel";
import TextBookPresenter from "./TextBookPresenter";
import WordElem from "./WordElem";
import WordElemAuthorized from "./WordElemAuthorized";
import WordElemHard from "./WordElemHard";

const textbookSettings = {
  chapters: [...Array(6)].map((el, ind) => ind + 1),
  pages: [...Array(30)].map((el, ind) => ind + 1),
  groupColors: ['#fff', '#62a3a7', '#407da4', '#0266e7', '#00367a', '#4332a9', '#2a2077', '#d86060'],
  hardWordsGroupNum: 7,
  games: ['Аудиовызов', 'Спринт'],
}

export class TextBookPage extends Page {
  private presenter = new TextBookPresenter(this);
  protected container = new Component('div', 'textbook').node;
  private header = new Component('div', 'textbook__header', 'Учебник').node;
  private groupNum = 1;
  private groupSelect = new Component('button', 'location-select__button location-select__button_group', '').node;
  private pageNum = 1;
  private pageSelect = new Component('button', 'location-select__button location-select__button_page', '').node;
  private gameSelect = new Component('button', 'location-select__button location-select__button_game', 'Мини-игра').node;
  private wordsContainer = new Component('div', 'textbook__words').node;

  constructor() {
    super();
    this.container.append(this.header);
    const nav = new Component('div', 'textbook__nav').node;
    this.creatChapterSelect(nav);
    this.createPageSelect(nav);
    this.createGameSelect(nav);
    this.container.append(nav, this.wordsContainer);
  }

  render() {
    document.body.className = 'body';
    this.wordsContainer.innerHTML = '';
    const { group, page } = this.getLocation();
    this.pageNum = page;
    this.groupNum = group;
    this.container.style.setProperty('--group-color', `${textbookSettings.groupColors[group]}`);
    if(this.groupNum === textbookSettings.hardWordsGroupNum) {
      this.presenter.onHardWordsPageSelect();
      this.groupSelect.innerText = `Сложные слова`;
      this.pageSelect.style.visibility = 'hidden';
    } else {
      this.groupSelect.innerText = `Уровень ${group}`;
      this.pageSelect.style.visibility = '';
      this.pageSelect.innerText = `Страница ${page}`;
      this.presenter.onPageSelect(group - 1, page - 1);
    }
    return this.container;
  }

  public async displayWords(data: WordData[]) {
    if (localStorage.getItem(LocalStorageKey.token)) {
      const [hardWords, learnedWords] = await Promise.all([this.presenter.getHardWords(), this.presenter.getLearnedWords()]);
      data.forEach((el) => {
          const word = new WordElemAuthorized(el, this.presenter, hardWords, learnedWords).node;
          this.wordsContainer.append(word);
      })
    } else {
      data.forEach((el) => {
        const word = new WordElem(el, this.presenter).node;
        this.wordsContainer.append(word);
      })
    }
  }

  displayHardWords(data: WordData[]) {
    data.forEach((el) => {
      const word = new WordElemHard(el, this.presenter).node;
      this.wordsContainer.append(word);
    })
  }

  private getLocation() {
    const pathName = (window.location.hash.slice(2).toLowerCase()).split('/');
    const path = { group: +pathName[1], page: +pathName[2] };
    return path;
  }

  private creatChapterSelect(parent: HTMLElement): void {
    const container = new Component('div', 'location-select').node;
    const list = new Component('ul', 'location-select__list location-select__list_group').node;

    textbookSettings.chapters.forEach((el) => {
      const listItem = new Component('li', 'location-select__item', `Уровень ${el}`).node;
      listItem.style.setProperty('--decor-color', `${textbookSettings.groupColors[el]}`);
      listItem.onclick = () => {
        if (el === this.groupNum) return;
        history.pushState('', '', `#/textbook/${el}/1`);
        this.render();
      }
      list.append(listItem);
    })

    if (localStorage.getItem(LocalStorageKey.token)) {
      const additionalListItem = new Component('li', 'location-select__item', `Cложные слова`).node;
      const group = textbookSettings.hardWordsGroupNum;
      additionalListItem.style.setProperty('--decor-color', `${textbookSettings.groupColors[group]}`);
      additionalListItem.onclick = () => {
        if (this.groupNum === group) return;
        history.pushState('', '', `#/textbook/${group}/1`);
        this.render();
      }
      list.append(additionalListItem);
    }

    container.append(this.groupSelect, list);

    this.groupSelect.onclick = (e) => {
      list.classList.add('active');
    }

    document.addEventListener('click', (e) => {
      if(e.target instanceof HTMLElement && !(e.target.closest('.location-select__button_group'))) {
        list.classList.remove('active');
      }
    })

    parent.append(container);
  }

  private createPageSelect(parent: HTMLElement): void {
    const container = new Component('div', 'location-select').node;
    const list = new Component('ul', 'location-select__list location-select__list_page').node;

    textbookSettings.pages.forEach((el) => {
      const listItem = new Component('li', 'location-select__item', `Страница ${el}`).node;
      list.append(listItem);
      listItem.onclick = () => {
        if (el === this.pageNum) return;
        history.pushState('', '', `#/textbook/${this.groupNum}/${el}`);
        this.render();
      }
    })

    this.pageSelect.onclick = (e) => {
      list.classList.add('active');
    }

    document.addEventListener('click', (e) => {
      if(e.target instanceof HTMLElement && !(e.target.closest('.location-select__button_page'))) {
        list.classList.remove('active');
      }
    })

    container.append(this.pageSelect, list);
    parent.append(container);
  }

  private createGameSelect(parent: HTMLElement) {
    const container = new Component('div', 'location-select').node;
    const list = new Component('ul', 'location-select__list').node;

    const audioсallBtn = new Component('li', 'location-select__item', `Аудиовызов`).node;
    const sptintBtn = new Component('li', 'location-select__item', `Спринт`).node;
    list.append(audioсallBtn, sptintBtn);

    this.gameSelect.onclick = (e) => {
      list.classList.add('active');
    }

    document.addEventListener('click', (e) => {
      if(e.target instanceof HTMLElement && !(e.target.closest('.location-select__button_game'))) {
        list.classList.remove('active');
      }
    })

    container.append(this.gameSelect, list);
    parent.append(container);
  }
}

export default new TextBookPage();
