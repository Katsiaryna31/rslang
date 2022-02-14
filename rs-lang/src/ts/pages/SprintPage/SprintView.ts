import { Word } from "../../common/wordInterfaces";
import SprintPresenter from "./SprintPresenter";

export default class SprintView {
  private presenter: SprintPresenter = new SprintPresenter(this);
  rightAnswers: Word[] = [];
  wrongAnswers: Word[] = [];
 
  gameContainer = <HTMLDivElement>document.querySelector('.sprint-container');

  constructor () {

  }
}