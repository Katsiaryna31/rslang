import { renderSprint, nextQuestionTrue, nextQuestionFalse, renderCircleBlock, renderToyBlock, numberWordsEng } from './view';
import { timer, audioStart, getRandomPage } from './utils';
/* import { playAudio } from './controller';
 */


const baseURL = 'http://127.0.0.1:3000';
const path = '/words';
let page = getRandomPage();
let group = 0;
let array = [];
export let arrayEng = [];
export let arrayRus = [];  
let arrayPron = [];
let arrayTranscr = [];


async function fetchWords(page, group) {
    const response = await fetch(
      `http://127.0.0.1:3000/words?page=${page}&group=${group}`
    );
    const items = await response.json();
    array = items;
     
 }

 let resultSum;
 let cardCircle;
 let cardDuck, cardPoni, cardSheep;
 let toyBlock;
 let soundImage;

 export async function makeQuestionsArray(group){
     await fetchWords(page, group);
     console.log(array)
     array.map((a) => arrayEng.push(a.word))
     /* console.log(arrayEng) */
     array.map((a) => arrayRus.push(a.wordTranslate))
     /* console.log(arrayRus) */
     array.map((a) => arrayPron.push(a.audio))
     array.map((a) => arrayTranscr.push(a.transcription))
/*       console.log(arrayTranscr) 
 */
audioStart()
     renderSprint();
     timer();

     let leftBut = document.getElementById('btn-left');
    let rightBut = document.getElementById('btn-right');
    resultSum = document.getElementById('result');
    cardCircle = document.getElementById('card-circle-block');
    cardDuck = document.getElementById('card-img-top1');
    cardPoni = document.getElementById('card-img-top1');
    cardSheep = document.getElementById('card-img-top1');
    toyBlock = document.getElementById('png-image-block');
    soundImage = document.getElementById('sound-image');
    


    
    
    //resultSum.addEventListener('click', nextQuestionFalse);
    leftBut.addEventListener('click', nextQuestionFalse);
    rightBut.addEventListener('click', nextQuestionTrue);

    document.addEventListener('keydown', function(event) {
      if (event.code == 'ArrowLeft') {
        nextQuestionFalse()
      }
    });
    document.addEventListener('keydown', function(event) {
      if (event.code == 'ArrowRight') {
        nextQuestionTrue()
      }
    });

    renderCircleBlock()
    renderToyBlock();
   /*  console.log(array)
    console.log(window) */
    playAudio()
 }
  
/*   makeQuestionsArray(); 
 */  
 export { resultSum, cardCircle, cardDuck, cardPoni, cardSheep, toyBlock }
export{soundImage, arrayPron, innerPoint }
export{page, group, array, arrayEng, arrayRus, arrayTranscr }
 


//audio
let audioId = 'sound-image';

export function playAudio(){
  const ctx = new AudioContext();
  let audio;
  
  fetch(`http://127.0.0.1:3000/${arrayPron[numberWordsEng]}`)
  .then(data => data.arrayBuffer())
  .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
  .then(decodedAudio => {
    audio = decodedAudio;
  } );
  
  function playback(){
    const playSound = ctx.createBufferSource();
    playSound.buffer = audio;
    console.log(playSound.buffer)
    playSound.connect(ctx.destination);
    console.log(ctx.destination)
    playSound.start(ctx.currentTime);
  }

  let buttonSound = document.getElementById(`${audioId}`)
  if(buttonSound){
    buttonSound.addEventListener('mousedown', playback);
    
  } 
  
}



