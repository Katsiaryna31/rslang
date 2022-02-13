import Component from "../../common/Component";
import { FILES_LINK, LocalStorageKey } from "../../settings";
import { WordData } from "./TextBookModel";
import TextBookPresenter from "./TextBookPresenter";

const createAudioImg = () => `
<svg width="25" height="20" viewBox="0 0 38 31" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.3511 0C18.875 0 18.4622 0.161587 18.1138 0.484761L8.9609 8.97374H1.76C1.28282 8.97374 0.871122 9.13533 0.522673 9.4585C0.174224 9.78167 0 10.1645 0 10.6061V20.3939C0 20.8355 0.174224 21.2183 0.522673 21.5415C0.871122 21.8647 1.28393 22.0263 1.76 22.0263H8.9609L18.1138 30.5152C18.4622 30.8384 18.8739 31 19.3511 31C19.8283 31 20.24 30.8384 20.5884 30.5152C20.9369 30.1921 21.1111 29.8102 21.1111 29.3677V1.63234C21.1111 1.1908 20.9369 0.807935 20.5895 0.484761C20.2422 0.161587 19.8294 0 19.3522 0H19.3511Z" fill="#B3B3B3"/>
<path d="M29.5979 19.1322C30.3389 18.0151 30.7094 16.8082 30.7094 15.5103C30.7094 14.2125 30.3389 13.0014 29.5979 11.8751C28.8569 10.7487 27.8774 9.95512 26.6561 9.49425C26.4819 9.40952 26.2634 9.36612 26.0027 9.36612C25.5499 9.36612 25.1572 9.52422 24.8258 9.83939C24.4943 10.1566 24.3286 10.5431 24.3286 11.004C24.3286 11.3625 24.4331 11.6653 24.6432 11.9123C24.8532 12.1592 25.1044 12.3731 25.4011 12.5519C25.6966 12.7307 25.9932 12.927 26.2898 13.1409C26.5864 13.3548 26.8387 13.6565 27.0477 14.0492C27.2567 14.4419 27.3612 14.9286 27.3612 15.5083C27.3612 16.088 27.2567 16.5747 27.0477 16.9673C26.8387 17.36 26.5864 17.6628 26.2898 17.8756C25.9932 18.0885 25.6966 18.2859 25.4011 18.4646C25.1044 18.6434 24.8522 18.8573 24.6432 19.1043C24.4342 19.3512 24.3286 19.655 24.3286 20.0126C24.3286 20.4734 24.4954 20.8609 24.8258 21.1771C25.1572 21.4913 25.5488 21.6514 26.0027 21.6514C26.2634 21.6514 26.4819 21.6091 26.6561 21.5233C27.8763 21.0449 28.8569 20.2471 29.5979 19.1291V19.1322Z" fill="#B3B3B3"/>
<path d="M35.7563 22.8582C37.252 20.6112 37.9999 18.1571 37.9999 15.499C37.9999 12.8419 37.252 10.3899 35.7563 8.13971C34.2605 5.89271 32.2811 4.25452 29.819 3.23039C29.591 3.14417 29.362 3.10001 29.1329 3.10001C28.6759 3.10001 28.2796 3.26509 27.9451 3.59525C27.6105 3.92541 27.4443 4.31551 27.4443 4.76764C27.4443 5.44479 27.7874 5.95685 28.4735 6.30489C29.4579 6.80855 30.1269 7.19023 30.4785 7.45099C31.7803 8.38891 32.7967 9.56445 33.5265 10.9797C34.2562 12.395 34.6216 13.9007 34.6216 15.5C34.6216 17.0972 34.2562 18.6039 33.5265 20.0203C32.7967 21.4356 31.7803 22.6111 30.4785 23.549C30.1269 23.8098 29.4579 24.1915 28.4735 24.6951C27.7874 25.0432 27.4443 25.5542 27.4443 26.2324C27.4443 26.6835 27.6116 27.0746 27.9451 27.4048C28.2785 27.7349 28.6833 27.9 29.1585 27.9C29.3694 27.9 29.59 27.8558 29.818 27.7696C32.28 26.7444 34.2605 25.1084 35.7552 22.8593L35.7563 22.8582Z" fill="#B3B3B3"/>
</svg>`;

export default class WordElem {
  public node: HTMLElement;

  constructor(
    data: WordData,
    protected presenter: TextBookPresenter,
  ) {
    this.node = new Component('div', 'word').node;
    const header = new Component('div', 'word__header').node;
    header.style.backgroundImage = `url(${FILES_LINK + data.image})`;
    const wordStr = new Component('p', 'word__word-string', `${data.word}`).node;
    const topRow = new Component('p', 'word__top-row').node;
    const wordTranslate = new Component('p', 'word__word-translate', `${data.wordTranslate}   ${data.transcription}`).node;
    const audio = new Component('span', 'word__audio', 'play').node;
    audio.innerHTML = createAudioImg();
    audio.onclick = () => this.presenter.onPlay(data);
    topRow.append(wordTranslate, audio);
    header.append(wordStr);
    const text = new Component('div', 'text').node;
    text.innerHTML = `
    <p class="word__text-meaning">${data.textMeaning}</p>
    <p class="word__text-example">${data.textExample}</p>
    <p class="word__text-meaning-transl">${data.textMeaningTranslate}</p>
    <p class="word__text-example-transl">${data.textExampleTranslate}</p>
    `;

    this.node.append(header, topRow, text);
  }
}