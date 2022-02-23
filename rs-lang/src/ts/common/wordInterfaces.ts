export interface Word {
  "_id": string;
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

export interface Statistics {
  learnedWords: number,
  optional: {
    firstTimeInGame: string,
    audiocall: {
      rightAnswers: number,
      wrongAnswers: number,
      rightSeries: number,
    }
    sprint: {
      rightAnswers: number,
      wrongAnswers: number,
      rightSeries: number,
    }
  },
}