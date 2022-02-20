import { Statistics, Words } from "../../common/wordInterfaces";
import { BASE_LINK, LocalStorageKey } from "../../settings";
import { today } from "../StatisticsPage/wordStats";
import TextBookModel from "../TextBook/TextBookModel";

const userId = localStorage.getItem(LocalStorageKey.id) || '';
const token = localStorage.getItem(LocalStorageKey.token) || '';

export default class AudioCallModel {
  private answersPerQuestion: number = 5;

  data: Words = [];
  rightAnswers: Words = [];
  level: string = '';

  async getWords(level: string, page:string) {
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

  async getHardWords() {
    this.data = await TextBookModel.getHardWords();
    if (this.data.length < 10) {
      let response = await fetch(`${BASE_LINK}/words?group=5&page=29`, {
          method: 'GET',
      });
      this.data = this.data.concat(await response.json());
    }
  }

  async getUserStatistics() {
    let response = await fetch(`${BASE_LINK}/users/${userId}/statistics`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
    if (response.ok) {
      const content:Statistics = await response.json();
      return content;
    }
    return null
  }

  async updateUserStatistics(statistics: Statistics) {
    let currentData = await this.getUserStatistics();
    if (!currentData || currentData.optional.firstTimeInGame !== today()) {
      const rawResponse = await fetch(`${BASE_LINK}/users/${userId}/statistics`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(statistics)
      });
      const content = await rawResponse.json();
    } else {
      if (statistics.optional.audiocall && currentData.optional.audiocall) {
        const updatedData: Statistics = {
          learnedWords: currentData.learnedWords + statistics.learnedWords,
          optional: {
            firstTimeInGame: statistics.optional.firstTimeInGame,
            audiocall: {
              rightAnswers: currentData.optional.audiocall.rightAnswers + statistics.optional.audiocall.rightAnswers,
              wrongAnswers: currentData.optional.audiocall.wrongAnswers + statistics.optional.audiocall.wrongAnswers,
              rightSeries: (currentData.optional.audiocall.rightSeries > statistics.optional.audiocall.rightSeries)? currentData.optional.audiocall.rightSeries : statistics.optional.audiocall.rightSeries,
            },
            sprint: {
              rightAnswers: currentData.optional.sprint.rightAnswers,
              wrongAnswers: currentData.optional.sprint.wrongAnswers,
              rightSeries: currentData.optional.sprint.rightSeries,
            },
          }
        }
        const rawResponse = await fetch(`${BASE_LINK}/users/${userId}/statistics`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedData)
        });
        const content = await rawResponse.json();
      }
    };
  }
}
