import { playAudio, arrTrueAnsw, arrayPron } from './model';
import {arrTrueAnsw, renderResultsPage} from './view'
import {numberWordsEng} from './view'

export function getRandom () {
    return Math.round(Math.random()) ? true : false;
}

export function getRandomPage () {
 
  return Math.round(Math.random()*29);
}


export let timer = () => {
    let sec = 61;
    let timeT = document.querySelector('.timer');
    let sec_timer = setInterval(() => {
        if(sec > 0){
            sec --;
            if(sec < 10){
                sec = '0' + sec;
            }
        } else {
            clearInterval(sec_timer);
            endGame()
           
        }
        timeT.innerHTML = `${sec}`;
        return sec;
    }, 1000);
}

function endGame(){
    renderResultsPage();

     playAudio();
    
     
}


export function audioStart(){
  var song = new Audio();
  song.src = __dirname +'sprint/sounds/art-quiz_assets_sound_raund.mp3';
  song.play();
 }
 export function audioTrue(){
  var song = new Audio();
  song.src = __dirname +'sprint/sounds/incorrect.mp3';
  song.play();
 }
 export function audioFalse(){
  var song = new Audio();
  song.src = __dirname +'sprint/sounds/correct.mp3';
  song.play();
 }

