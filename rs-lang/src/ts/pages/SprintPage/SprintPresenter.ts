import { Words } from "../../common/wordInterfaces";
import SprintModel from "./SprintModel";
import SprintView from "./SprintView";

export default class SprintPresenter {
  private questionsPerLevel: number = 10;
  level:string = '';
  model: SprintModel  = new SprintModel();
  view: SprintView;
  
  answers: Words = [];

  constructor(view: SprintView) {
    this.view = view;
  }
  
}