import { Words } from "../../common/wordInterfaces";
import { BASE_LINK, LocalStorageKey } from "../../settings";
import TextBookModel, { UserWord } from "../TextBook/TextBookModel";

const userId = localStorage.getItem(LocalStorageKey.id) || '';
const token = localStorage.getItem(LocalStorageKey.token) || '';

export default class AudioCallModel {
  private answersPerQuestion: number = 5;

  data: Words = [];
  rightAnswers: Words = [];
  level: string = '';

  async getWords(level: string, page:string) {
    console.log('level' + level, 'page' + page);
    this.level = level;
    if (page === 'any') {
        let response = await fetch(`${BASE_LINK}/words?group=${this.level}`, {
            method: 'GET',
          });
        this.data = await response.json();
    } else {
        let response = await fetch(`${BASE_LINK}/words?group=${this.level}&page=${page}`, {
            method: 'GET',
          });
        this.data = await response.json();
        if (this.data.length < 10) {
            let response = await fetch(`${BASE_LINK}/words?group=6&page=30`, {
                method: 'GET',
            });
            this.data = this.data.concat(await response.json());
        }
    }
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

  async createUserWord(wordId: string, word: UserWord) {
    TextBookModel.createUserWord(wordId, word);
    // const response = await fetch(`${BASE_LINK}/users/${userId}/words/${wordId}`, {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${token}`,
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(word)
    // });
  };
      
  async getUserWord(wordId: string) {
    return await TextBookModel.getUserWord(wordId);
    // const response = await fetch(`${BASE_LINK}/users/${userId}/words/${wordId}`, {
    //   method: 'GET',
    //   headers: {
    //     'Authorization': `Bearer ${token}`,
    //     'Accept': 'application/json',
    //   }
    // });
    // if (response.ok) {
    //   const content: UserWord = await response.json();
    //   return content;
    // }
    // return null;
  };

  async updateUserWord(wordId: string, word: UserWord) {
    TextBookModel.updateUserWord(wordId, word);
    // const response = await fetch(`${BASE_LINK}/users/${userId}/words/${wordId}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Authorization': `Bearer ${token}`,
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(word)
    // });
  };

}
