import { Words } from './AudioCallModel';
import Component from "../../common/Component";
import { shuffle } from "../../common/shuffleArray";


export default class AudioCallView {
  constructor () {

  }

  displayAnswers(answers: Words) {
    const gameContainer = <HTMLDivElement>document.querySelector('.audiocall');
    const answersContainer = new Component('ol', 'answers-container').node;
    shuffle(answers).forEach((answer, index) => {
      const answerEl =   new Component('li', 'answer-container', `${answer.wordTranslate}`).node;
      answersContainer.append(answerEl);
    });
    gameContainer.append(answersContainer);
  }
    
}