import Component from "../../common/Component";
import { WordData } from "./TextBookModel";
import TextBookPresenter from "./TextBookPresenter";
import WordElem from "./WordElem";

const createBookMarkImg = () => `
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
width="23" height="21" fill="#b3b3b3" viewBox="0 0 472.615 472.615" style="enable-background:new 0 0 472.615 472.615;" xml:space="preserve">
<g>
	<g>
		<polygon points="236.307,0 96.738,0 96.738,472.615 236.307,365.585 375.877,472.615 375.877,0 		"/>
	</g>
</g>
</svg>`;

const createCheckImg = () => `
<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
width="23" height="23" fill="#b3b3b3" viewBox="0 0 415.582 415.582" style="enable-background:new 0 0 415.582 415.582;"
	 xml:space="preserve">
	<path d="M411.47,96.426l-46.319-46.32c-5.482-5.482-14.371-5.482-19.853,0L152.348,243.058l-82.066-82.064
		c-5.48-5.482-14.37-5.482-19.851,0l-46.319,46.32c-5.482,5.481-5.482,14.37,0,19.852l138.311,138.31
		c2.741,2.742,6.334,4.112,9.926,4.112c3.593,0,7.186-1.37,9.926-4.112L411.47,116.277c2.633-2.632,4.111-6.203,4.111-9.925
		C415.582,102.628,414.103,99.059,411.47,96.426z"/>
</svg>`;

export default class WordElemAuthorized extends WordElem{
  constructor(
    data: WordData,
    protected presenter: TextBookPresenter,
    private hardWords: WordData[],
    private learnedWords: WordData[],
  ) {
    super(data, presenter);
    const hardWordBtn = new Component<HTMLInputElement>('button', 'word__btn word__btn_hard').node;
    hardWordBtn.innerHTML = createBookMarkImg();

    const learnedWordBtn = new Component<HTMLInputElement>('button', 'word__btn word__btn_learned').node;
    learnedWordBtn.innerHTML = createCheckImg();

    if (hardWords.some((word) => word._id === data.id)) {
      hardWordBtn.classList.add('active');
    } else if (learnedWords.some((word) => word._id === data.id)) {
      learnedWordBtn.classList.add('active');
      this.node.classList.add('dark');
    }

    hardWordBtn.onclick = async () => {
      if (!hardWordBtn.classList.contains('active')) {
        hardWordBtn.classList.add('active');
        learnedWordBtn.classList.remove('active');
        await this.presenter.wordDifficultyUpdate(hardWordBtn, data.id, 'hard');
      } else {
        hardWordBtn.classList.remove('active');
        await this.presenter.wordDifficultyUpdate(hardWordBtn, data.id, 'normal');
      }
      this.presenter.checkCurrentPage();
    }

    learnedWordBtn.onclick = async () => {
      if (!learnedWordBtn.classList.contains('active')) {
        hardWordBtn.classList.remove('active');
        learnedWordBtn.classList.add('active');
        this.node.classList.add('dark');
        await this.presenter.wordDifficultyUpdate(learnedWordBtn, data.id, 'learned');
      } else {
        learnedWordBtn.classList.remove('active');
        this.node.classList.remove('dark');
        await this.presenter.wordDifficultyUpdate(learnedWordBtn, data.id, 'normal');
      }
      this.presenter.checkCurrentPage();
    }

    this.node.append(hardWordBtn, learnedWordBtn);
  }
}
