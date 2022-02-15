import { getRandomPage } from "../../common/utils";
import { Words } from "../../common/wordInterfaces";
import { BASE_LINK } from "../../settings";


export default class SprintModel {
    
    array: Words = [];
    arrayEng: string[] = [];
    arrayRus: string[] = [];  
    arrayPron: string[] = [];
    arrayTranscr: string[] = [];
    page: string = '';
    
    constructor () {
    }

    async fetchWords(group: string) {
      const response = await fetch(
        `http://127.0.0.1:3000/words?page=${this.page}&group=${group}`
      );
      const items = await response.json();
      this.array = items;    
   }

    async makeQuestionsArray(group:string, page:string = 'any') {
      if (page === 'any') {
        this.page = String(getRandomPage());
      } else {
        this.page = page;
      }
      await this.fetchWords(group);
      this.array.map((a) => this.arrayEng.push(a.word))
      /* console.log(arrayEng) */
      this.array.map((a) => this.arrayRus.push(a.wordTranslate))
      /* console.log(arrayRus) */
      this.array.map((a) => this.arrayPron.push(a.audio))
      this.array.map((a) => this.arrayTranscr.push(a.transcription))
    }

  playAudio(numberWordsEng: number){
    const audio = new Audio(`https://rsschool-learnwords.herokuapp.com/${this.arrayPron[numberWordsEng - 1]}`);
    audio.play();
  }
}