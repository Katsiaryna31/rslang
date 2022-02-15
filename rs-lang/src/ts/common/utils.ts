import { AudioCallPage } from './../pages/AudioCallPage/AudioCallPage';
import { SprintPage } from "../pages/SprintPage/SprintPage";
import Component from "./Component";

export function shuffle<T> (array:T[]):T[] {
    let result = array;
    for (let i = result.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

export function getRandom () {
    return Math.round(Math.random()) ? true : false;
}

export function getRandomPage () {
  return Math.round(Math.random()*29);
}

export function audioStart(){
    var song = new Audio();
    song.src = __dirname +'sounds/art-quiz_assets_sound_raund.mp3';
    song.play();
}
  
export function audioTrue(){
    var song = new Audio();
    song.src = __dirname +'sounds/incorrect.mp3';
    song.play();
}
  
export function audioFalse(){
    var song = new Audio();
    song.src = __dirname +'sounds/correct.mp3';
    song.play();
}

export function createPopUp(gameName: string) {
    const popupOverlayComponent = new Component('div', 'popup__overlay');
    const popupOverlay = popupOverlayComponent.node;
    document.body.append(popupOverlay);
    const popupComponent = new Component('div', 'popup');
    const popup = popupComponent.node;
    const textPopup = new Component('div', 'popup-text', 'Вы действительно хотите закончить игру?').node;
    popup.append(textPopup);
    const buttonStop = new Component('button', 'popup-stop', 'Закончить игру').node;
    buttonStop.addEventListener('click', () => {
        const root = document.querySelector('#root') as HTMLElement;
        root.innerHTML = '';
        if (gameName === 'sprint') {
            const game = new SprintPage();
            const pageElement = game.render();
            root.append(pageElement);
            popupComponent.destroy();
            popupOverlayComponent.destroy();
        } else if (gameName === 'audiocall') {
            const game = new AudioCallPage();
            const pageElement = game.render();
            root.append(pageElement);
            popupComponent.destroy();
            popupOverlayComponent.destroy();
        }
    });
    popup.append(buttonStop);
    const buttonContinue = new Component('button', 'popup-continue', 'Продолжить игру').node;
    buttonContinue.addEventListener('click', () => {
        popupComponent.destroy();
        popupOverlayComponent.destroy();
    })
    popup.append(buttonContinue);
    document.body.append(popup);
}


