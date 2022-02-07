import { shuffle } from "../../common/shuffleArray";
import { BASE_LINK } from "../../settings";

export interface Word {
    "id": string,
    "group": number,
    "page": number,
    "word": string,
    "image": string,
    "audio": string,
    "audioMeaning": string,
    "audioExample": string,
    "textMeaning": string,
    "textExample": string,
    "transcription": string,
    "wordTranslate": string,
    "textMeaningTranslate": string,
    "textExampleTranslate": string
};

export interface Words extends Array<Word>{};

export default class AudioCallModel {
    private questionsPerLevel: number = 10;
    private answersPerQuestion: number = 5;

    data: Words = [];
    rightAnswers: Words = [];
    page: string = '';
    
    constructor () {
    }

    async getWords(page: string) {
        this.page = page;
        console.log(this.page);
        let response = await fetch(`${BASE_LINK}/words?page=${this.page}`, {
            method: 'GET',
          });
        this.data = await response.json();
        return this;
    }

    getAnswers() {
        const answers: Words = [];
        const randomAnswer = this.data[Math.floor(Math.random() * this.data.length)];
        if (!this.rightAnswers.includes(randomAnswer)) {
            this.rightAnswers.push(randomAnswer);
           answers.push(randomAnswer);
            for (let i = 0; i < this.answersPerQuestion - 1; i++) {
                const randomAnswerWrong =  this.data[Math.floor(Math.random() * this.data.length)];
                if (!answers.includes(randomAnswerWrong)) {
                    answers.push(randomAnswerWrong);
                } else {
                    i--;
                }
            }
        } else {
            this.getAnswers()
        }
        console.log(answers);
        return answers;
    }   
}