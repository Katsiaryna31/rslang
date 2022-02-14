import { Words } from "../../common/wordInterfaces";
import { BASE_LINK } from "../../settings";


export default class AudioCallModel {
    private answersPerQuestion: number = 5;

    data: Words = [];
    rightAnswers: Words = [];
    page: string = '';
    
    constructor () {
    }

    async getWords(page: string) {
        this.page = page;
        let response = await fetch(`${BASE_LINK}/words?page=${this.page}`, {
            method: 'GET',
          });
        this.data = await response.json();
        return this;
    }

    getAnswers() {
        const answers: Words = [];
        while (answers.length < this.answersPerQuestion) {
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
            }
        }
        return answers;
    }   
}