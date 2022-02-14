import { BASE_LINK, LocalStorageKey } from "../../settings";

export interface WordData {
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

export interface UserWord {
  difficulty?: string,
  optional?: Record<string, string>,
}

export interface Res {
  paginatedResults: WordData[];
}

const userId = localStorage.getItem(LocalStorageKey.id) || '';
const token = localStorage.getItem(LocalStorageKey.token) || '';

class TextBookModel {

  async getWords(group: number, page: number) {
    const rawResponse = await fetch(`${BASE_LINK}/words?group=${group}&page=${page}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });
    const content: WordData[] = await rawResponse.json();
    return content;
  }

  async createUserWord(wordId: string, word: UserWord) {
  const rawResponse = await fetch(`${BASE_LINK}/users/${userId}/words/${wordId}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(word)
  });
  const content = await rawResponse.json();
  };

  async getUserWord(wordId: string) {
    const response = await fetch(`${BASE_LINK}/users/${userId}/words/${wordId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      }
    });
    if (response.ok) {
      const content: UserWord = await response.json();
      return content;
    }
    return null
  };

  async updateUserWord(wordId: string, word: UserWord) {
    const rawResponse = await fetch(`${BASE_LINK}/users/${userId}/words/${wordId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(word)
    });
    const content = await rawResponse.json();
  };

  async getHardWords() {
    const params = new URLSearchParams({
      page: '0',
      wordsPerPage: '3600',
      filter: '{"userWord.difficulty":"hard"}',
    }).toString();

    const response = await fetch(`${BASE_LINK}/users/${userId}/aggregatedWords?${params}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      }
    });
    const content: Res[] = await response.json();
    return content[0]['paginatedResults'];
  }

  async getLearnedWords() {
    const params = new URLSearchParams({
      page: '0',
      wordsPerPage: '3600',
      filter: '{"userWord.difficulty":"learned"}',
    }).toString();

    const response = await fetch(`${BASE_LINK}/users/${userId}/aggregatedWords?${params}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      }
    });

    const content: Res[] = await response.json();
      return content[0]['paginatedResults'];
  }

  async getLearnedAndHardWords(page: number, group: number) {
    const params = new URLSearchParams({
      page: '0',
      wordsPerPage: '20',
      filter: `{"$and":[{"$or":[{"userWord.difficulty":"learned"}, {"userWord.difficulty":"hard"}]},{"page":${page}}, {"group":${group}}]}`,
    }).toString();

    const response = await fetch(`${BASE_LINK}/users/${userId}/aggregatedWords?${params}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      }
    });
    const content: Res[] = await response.json();
      return content[0]['paginatedResults'];
  }
}

export default new TextBookModel();