import Component from "../../common/Component";
import { WordData } from "./TextBookModel";
import TextBookPresenter from "./TextBookPresenter";
import WordElem from "./WordElem";

const createBookMarkImg = () => `
<svg width="30" height="30" fill="#b3b3b3" viewBox="0 0 24 24" version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg">
<path d="M12 4c-4.419 0-8 3.582-8 8s3.581 8 8 8 8-3.582 8-8-3.581-8-8-8zm3.707 10.293c.391.391.391 1.023 0 1.414-.195.195-.451.293-.707.293s-.512-.098-.707-.293l-2.293-2.293-2.293 2.293c-.195.195-.451.293-.707.293s-.512-.098-.707-.293c-.391-.391-.391-1.023 0-1.414l2.293-2.293-2.293-2.293c-.391-.391-.391-1.023 0-1.414s1.023-.391 1.414 0l2.293 2.293 2.293-2.293c.391-.391 1.023-.391 1.414 0s.391 1.023 0 1.414l-2.293 2.293 2.293 2.293z"/>
</svg>`;

export default class WordElemHard extends WordElem{
  constructor(
    data: WordData,
    protected presenter: TextBookPresenter,
  ) {
    super(data, presenter);
    this.text.classList.add('text_auth');
    const deleteWordBtn = new Component<HTMLInputElement>('button', 'word__btn word__btn_delete').node;
    deleteWordBtn.innerHTML = createBookMarkImg();
    this.node.append(deleteWordBtn);

    deleteWordBtn.onclick = () => {
      this.node.remove();
      this.presenter.wordDifficultyUpdate(deleteWordBtn, data._id, 'normal');
      this.presenter.onHardWordRemove();
    }
  }
}