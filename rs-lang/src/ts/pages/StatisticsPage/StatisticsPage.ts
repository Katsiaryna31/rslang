import Component from '../../common/Component';
import Page from '../../common/Page';
import { BASE_LINK, LocalStorageKey } from '../../settings';
import { today } from './wordStats';
import { Res } from '../TextBook/TextBookModel';
import { updateGameStatistics } from './gameStatistics';

const userId = localStorage.getItem(LocalStorageKey.id) || '';
const token = localStorage.getItem(LocalStorageKey.token) || '';

class StatisticsPage extends Page {
  render() {
    document.body.className = 'body';
    this.displayWordsStatistics();
    return this.container;
  }

  async displayWordsStatistics() {
    const words = await getNewGameWords();
    const newWords = words.filter((w) => w.userWord?.optional.firstTimeInGame === today());
    const audiocallNewWords = newWords.filter((w) => w.userWord?.optional.firstGameName === 'audiocall');
    const sprintNewWords = newWords.filter((w) => w.userWord?.optional.firstGameName === 'sprint');
    const learnedWords = await getNewLearnedWords();

    const gameData = await updateGameStatistics();
    console.log(gameData);
    this.container.innerHTML = `
    <div class="textbook__header">Статистика</div>
        <h2>${new Date().toLocaleString('ru', { year: 'numeric', month: 'long', day: 'numeric' })}</h2>
        <p>Общее количество новых слов за день: ${newWords.length}</p>
        <p>Общее количество изученных слов за день: ${learnedWords.length}</p>
        <p>Процент правильных ответов за день: ?</p>
        <h3 style="margin-top: 15px">Статистика мини-игр</h3>
        <table>
          <thead>
            <th></th>
            <th> Новые слова </th>
            <th> Процент правильных ответов </th>
            <th> Лучшая серия </th>
          </thead>
          <tbody>
            <tr>
              <td>Аудиовызов </td>
              <td>${audiocallNewWords.length}</td>
              <td>?</td>
              <td>?</td>
            </tr>
            <tr>
              <td>Спринт </td>
              <td>${sprintNewWords.length}</td>
              <td>?</td>
              <td>?</td>
            </tr>
          </tbody>
        </table>
    `;
    
    // newWords.forEach(w => {
    //   this.container.append(new Component('p', '', `${w.wordTranslate} ${w.userWord?.optional.firstTimeInGame}`).node);
    // })

    // learnedWords.forEach(w => {
    //   this.container.append(new Component('p', '', `${w.wordTranslate} ${w.userWord?.optional.learnedOn}`).node);
    // })
  }
}

export default new StatisticsPage();

async function getNewGameWords() {
  const params = new URLSearchParams({
    page: '0',
    wordsPerPage: '3600',
    filter: `{"userWord.optional.playedInGame":true}`,
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

async function getNewLearnedWords() {
  const params = new URLSearchParams({
    page: '0',
    wordsPerPage: '3600',
    filter: `{"userWord.optional.learnedOn":"${today()}"}`,
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
