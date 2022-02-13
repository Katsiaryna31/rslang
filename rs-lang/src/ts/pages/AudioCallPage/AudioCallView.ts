import Component from "../../common/Component";
import { shuffle } from "../../common/shuffleArray";
import AudioCallPresenter, { Word, Words } from './AudioCallPresenter';


export default class AudioCallView {
  private presenter: AudioCallPresenter = new AudioCallPresenter(this);
  rightAnswers: Word[] = [];
  wrongAnswers: Word[] = [];
 
  gameContainer = <HTMLDivElement>document.querySelector('.audiocall');

  constructor () {

  }

  async startQuiz(level: string) {
    await this.presenter.createQuiz(level);
  }

  async displayQuestion(question: Word) {
    const questionContainer = <HTMLDivElement>document.querySelector('.question-container');
    const questionText = new Component('div', 'question-text-container').node;
    const soundButton = new Component('button', 'question-button').node;
    const soundImage = new Component('img', 'question-image', '', {src: '../../images/sound.svg', width: '54', height: '54'}).node;
    soundButton.append(soundImage);
    const audio = new Audio(`https://rss-words-3.herokuapp.com/${question.audio}`);
    await audio.play();
    soundButton.addEventListener('click', async () => {
      await audio.play();
    });
    questionContainer.append(questionText);
    questionText.append(soundButton);
  }

  async displayAnswers(answers: Words, rightAnswer: Word) {
    const questionContainer = new Component('div', 'question-container').node;
    const answersContainer = new Component('div', 'answers-container').node;
    shuffle(answers).forEach((answer, index) => {
      const answerEl =   new Component('button', 'answer-container', `${index + 1}. ${answer.wordTranslate}`).node;
      if (answer.id === rightAnswer.id) {
        answerEl.classList.add('right-answer');
      }
      answersContainer.append(answerEl);
      answerEl.addEventListener('click', () => {
        if (answer.id === rightAnswer.id) {
          this.rightAnswers.push(answer);
          this.onSelectAnswer('right');
          this.showAnswer(rightAnswer);
        } else {
          this.wrongAnswers.push(answer);
          answerEl.style.textDecoration = 'line-through';
          this.onSelectAnswer('wrong');
          this.showAnswer(rightAnswer);
        }
      })
    });
    const dontKnowButton = new Component('button', 'result-button', `Не знаю`).node;
    dontKnowButton.addEventListener('click' , () => {
      this.onSelectAnswer('wrong');
      this.showAnswer(rightAnswer);
    });
    this.gameContainer.append(questionContainer);
    this.gameContainer.append(answersContainer);
    this.gameContainer.append(dontKnowButton);
    await this.displayQuestion(rightAnswer);
  }

  showAnswer(answer: Word) {
    const questionContainer = <HTMLDivElement>document.querySelector('.question-container');
    const questionText = <HTMLDivElement>document.querySelector('.question-text-container');
    const wordImage = new Component('img', 'right-image', ``, {src: `https://rss-words-3.herokuapp.com/${answer.image}`}).node;
    questionContainer.append(wordImage);
    const wordText = new Component('p', 'answer-text', `${answer.word}`).node;
    questionText.append(wordText);
  }

  onSelectAnswer(statusAnswer: string) {
    const audio = new Audio(`../../sounds/${statusAnswer}.mp3`);
    audio.play();
    const dontKnowButton = <HTMLButtonElement>document.querySelector('.result-button');
    dontKnowButton.remove();
    const rightAnswer = <HTMLButtonElement>document.querySelector('.right-answer');
    rightAnswer.classList.add('answer-container-right');
    const resultButton = new Component('button', 'result-button next', `→`).node;
    this.gameContainer.append(resultButton);
    resultButton.addEventListener('click', async () => {
      while (this.gameContainer.firstChild) {
        this.gameContainer.removeChild(this.gameContainer.firstChild);
      }
      await this.presenter.createNextQuestion();
    })
  } 

  createWordsList(answers: Word[], category:string, header:string) {
      const categoryAnswersContainer = new Component('div', `${category}-answers-container`).node;
      const categoryAnswersHeader = new Component('p', `${category}-answers-header`, `${header}`).node;
      const categoryAnswersNumber = new Component('span', `${category}-answers-span`, `${answers.length}`).node;
      categoryAnswersHeader.append(categoryAnswersNumber);
      categoryAnswersContainer.append(categoryAnswersHeader);
      const wordsList = new Component('ul', 'words-list').node;
      answers.forEach(answer => {
        const wordItem = new Component('li', 'answer-item').node;
        const soundButton = new Component('button', 'answer-sound-button').node;
        const soundImage = new Component('img', 'answer-sound-image', '', {src: '../../images/sound.svg', width: '30', height: '30'}).node;
        soundButton.append(soundImage);
        const audio = new Audio(`https://rss-words-3.herokuapp.com/${answer.audio}`);
        soundButton.addEventListener('click', async () => {
          await audio.play();
        }); 
        wordItem.append(soundButton);
        const wordContainer = new Component('p', 'answer-result-container').node;
        const word = new Component('span', 'answer-word', `${answer.word} -`).node;
        const wordTranslate = new Component('span', 'answer-translate', `${answer.wordTranslate}`).node;
        wordContainer.append(word);
        wordContainer.append(wordTranslate);
        wordItem.append(wordContainer);
        wordsList.append(wordItem);
      })
      categoryAnswersContainer.append(wordsList);
      return categoryAnswersContainer;
  }

  showResult() {
    const allAnswersContainer = new Component('div', 'all-answers').node;
    if (this.wrongAnswers.length > 0) {
      const wrongAnswersContainer = this.createWordsList(this.wrongAnswers, 'wrong', 'Ошибок');
      allAnswersContainer.append(wrongAnswersContainer);
    }
    if (this.rightAnswers.length > 0) {
      const rightAnswersContainer = this.createWordsList(this.rightAnswers, 'right', 'Знаю');
      allAnswersContainer.append(rightAnswersContainer);
    }
    this.gameContainer.append(allAnswersContainer);
  }
}