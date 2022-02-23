import TextBookModel from "../TextBook/TextBookModel";

export type GameName = 'audiocall' | 'sprint';

export async function updateWordWins(wordId: string, gameName: string) {
  const wordData = await TextBookModel.getUserWord(wordId);
  if (!wordData) {
    const updatedData = {
      difficulty: 'normal',
      optional: {
        wins: 1,
        fails: 0,
        playedInGame: true,
        straightWins: 1,
        firstGameName: gameName,
        firstTimeInGame: today(),
        learnedOn: 'null',
      }
    }
    TextBookModel.createUserWord(wordId, updatedData);
  } else {
    const isWordLearnedInGame = () => (wordData.optional.straightWins === 1 && wordData.difficulty === 'normal')
      || (wordData.optional.straightWins === 2 && wordData.difficulty === 'hard');

    const updatedData = {
      difficulty: isWordLearnedInGame() ? 'learned' : wordData.difficulty,
      optional: {
        wins: wordData.optional.wins + 1,
        fails: wordData.optional.fails,
        playedInGame: true,
        straightWins: wordData.optional.straightWins + 1,
        firstGameName: wordData.optional.firstGameName || gameName,
        firstTimeInGame: wordData.optional.firstTimeInGame || today(),
        learnedOn: isWordLearnedInGame() ? today() : wordData.optional.learnedOn,
      }
    }
    TextBookModel.updateUserWord(wordId, updatedData);
  }
}

export async function updateWordFails(wordId: string, gameName: string) {
  const wordData = await TextBookModel.getUserWord(wordId);
  if (!wordData) {
    const updatedData = {
      difficulty: 'normal',
      optional: {
        wins: 0,
        fails: 1,
        playedInGame: true,
        straightWins: 0,
        firstGameName: gameName,
        firstTimeInGame: today(),
        learnedOn: 'null',
      }
    }
    TextBookModel.createUserWord(wordId, updatedData);
  } else {
    const updatedData = {
      difficulty: wordData.difficulty = 'learned' ? 'normal' : wordData.difficulty,
      optional: {
        wins: wordData.optional.wins,
        fails: wordData.optional.fails + 1,
        playedInGame: true,
        straightWins: 0,
        firstGameName: wordData.optional.firstGameName || gameName,
        firstTimeInGame: wordData.optional.firstTimeInGame || today(),
        learnedOn: 'null',
      }
    }
    TextBookModel.updateUserWord(wordId, updatedData);
  }
}

export function today() {
  const now = new Date();
  return `${now.getFullYear()}.${now.getMonth()}.${now.getDate()}`;
}