import { arrayEng, arrayRus, arrayPron, arrayTranscr, resultSum, cardCircle, toyBlock, innerPoint } from './model';
import { numberWordsEng, numberWordsRus } from './controller';
import { getRandom, audioTrue, audioFalse } from './utils';
import { addQuetions, selectCategory } from './controller';
import { playAudio } from './model';


let numberWordsEng = 0;
let numberWordsRus = 0;


export const  renderSprint = () => {
    const html =`
    <div class="card" style="width: 50%">
    <div class="sprint-top">
      <div class="block-timer">
        <p class="timer"></p>
      </div>
      <div class="block-result">
        <p class="result" id="result">0</p>
      </div>
    </div>
    <div class="card-circle-block" id="card-circle-block">
    
    </div>
    <div class="png-image-block" id="png-image-block">
    </div>
    <div class="card-body">
      </div> 
      <div
        class="btn-group"
        role="group"
        aria-label="Basic mixed styles example"
      >
        <button type="button" class="btn btn-danger btn-left" id="btn-left">Неверно</button>
        <button type="button" class="btn btn-success btn-right" id="btn-right">Верно</button>
    </div>
  </div>
    `
    let main = document.querySelector('.main');
    main.innerHTML = html;
    renderMainWords(numberWordsEng, numberWordsRus);
}


export const renderMainWords = (numberWordsEng, numberWordsRus) => {
 let cardBody = document.querySelector('.card-body');
 cardBody.innerHTML = `<img class="sound-image" id="sound-image"
 src="./sprint/images/sound.png" alt="sound" />
    <h5 class="card-title">${arrayEng[numberWordsEng]}</h5>
    <p class="card-text">${arrayRus[numberWordsRus]}</p>`;
    
}

let arrBoolenAnswear = [];


export function nextQuestionTrue(){
   
    if(numberWordsEng === numberWordsRus){
        arrTrueAnsw.push(arrayEng[numberWordsEng])
        arrBoolenAnswear.push('true');
        console.log(arrBoolenAnswear)
        audioTrue();
    } else {
        arrTrueAnsw = [];
        arrBoolenAnswear.push('false');
        console.log(arrBoolenAnswear)
        audioFalse()
    }
    sumResult();
    renderCircleBlock();

    changeColorPoint()


    renderToyBlock();
    numberWordsEng += 1;
    numberWordsRus = numberWordsEng;
    if(!getRandom()){
        if(numberWordsEng >=0 && numberWordsEng <10){
          numberWordsRus = numberWordsEng + 10;
        } else if(numberWordsEng >=10){
          numberWordsRus = numberWordsEng - 10;
        }
    } 
    if(numberWordsEng % 19 === 0){
      addQuetions();
    }
     renderMainWords(numberWordsEng, numberWordsRus);
     playAudio()
}


export function nextQuestionFalse(){
    if(numberWordsEng !== numberWordsRus){
        arrTrueAnsw.push(arrayEng[numberWordsEng])
        arrBoolenAnswear.push('true');
        console.log(arrBoolenAnswear)
        audioTrue();
    } else {
        arrTrueAnsw = [];
        arrBoolenAnswear.push('false');
        console.log(arrBoolenAnswear)
        audioFalse()
    }
    sumResult();
    renderCircleBlock();
    changeColorPoint();
    renderToyBlock();
    numberWordsEng += 1;
    numberWordsRus = numberWordsEng;
    if(getRandom()){
        if(numberWordsEng >=0 && numberWordsEng <10){
          numberWordsRus = numberWordsEng + 10;
        } else if(numberWordsEng >=10){
          numberWordsRus = numberWordsEng - 10;
        }
    } 
     if(numberWordsEng % 19 === 0){
       addQuetions();
    } 
     renderMainWords(numberWordsEng, numberWordsRus)
    playAudio()
}

function changeColorPoint(){
  let innerPoint = document.getElementById('block-point-inner');
  if(arrTrueAnsw.length <= 3){
    innerPoint.classList.add('blue');
    if(innerPoint.classList.contains('red'))  innerPoint.classList.remove('red');
    if(innerPoint.classList.contains('orange'))  innerPoint.classList.remove('orange');
    if(innerPoint.classList.contains('chartreuse'))  innerPoint.classList.remove('chartreuse');
  }
  if(arrTrueAnsw.length >= 3 && arrTrueAnsw.length < 6){
    innerPoint.classList.add('red')
  }
 if(arrTrueAnsw.length >= 6 && arrTrueAnsw.length < 9){
  innerPoint.classList.remove('red')
  innerPoint.classList.add('orange')
}
if(arrTrueAnsw.length >= 9 ){
  innerPoint.classList.remove('orange')
  innerPoint.classList.add('chartreuse')
} 
}

let arrTrueAnsw = [];
let sum = 1;
let count=0;


function sumResult(){
    if(arrTrueAnsw.length === 1){
        count += sum ;
    return resultSum.innerText = `${count}`;
    }
    if(arrTrueAnsw.length === 2){
        count += sum ;
        return resultSum.innerText = `${count}`;
    }
    if(arrTrueAnsw.length === 3){
        count += sum ;
        return resultSum.innerText = `${count}`;
    }
    if(arrTrueAnsw.length > 3 && arrTrueAnsw.length <= 6){
        sum = 10;
        count += sum ;
        return resultSum.innerText = `${count}`;
    }
    if(arrTrueAnsw.length > 6 && arrTrueAnsw.length <= 9){
        sum = 25;
        count += sum ;
        return resultSum.innerText = `${count}`;
    }
    if(arrTrueAnsw.length > 9 ){
        sum = 50;
        count += sum ;
        return resultSum.innerText = `${count}`;
    }
    
}


export function renderCircleBlock(){
/*    let card = document.getElementsByClassName('card');
 */
    let color1 = "grey";
    let color2 = "grey"
    let color3 = "grey"
    if(arrTrueAnsw.length % 3 === 1) color1 = "#18F018";
    if(arrTrueAnsw.length % 3 === 2){
        color1 = "#18F018";
        color2 = "#18F018";
    }  
    if(arrTrueAnsw.length % 3 === 0 && arrTrueAnsw.length > 1){
        color1 = "#18F018";
        color2 = "#18F018";
        color3 = "#18F018";
    } 
    let addPoint ="+1"
    if(arrTrueAnsw.length < 3){
      addPoint = "+1";
    }
    if(arrTrueAnsw.length >= 3 && arrTrueAnsw.length < 6){
      addPoint = "+10";
/*        document.body.card.innerPoint.style.backgroundColor = "red";
 */      /* innerPoint.style.backgroundColor = "red"; */
    }
    if(arrTrueAnsw.length >= 6 && arrTrueAnsw.length < 9){
      addPoint = "+25";
    }
    if(arrTrueAnsw.length >= 9){
      addPoint = "+50";
    }
     cardCircle.innerHTML = `
     <div class="block-point">
        <h5 id="block-point-inner">${addPoint}</h5>
      </div>

      <div class="block-point-svg">
      <svg height="100" width="100">
      <circle cx="17"
        cy="17"
        r="12"
        stroke="black"
        stroke-width="1"
        fill="${color1}"
        class="circle"
      />
    </svg>
    <svg height="100" width="100">
      <circle
        cx="17"
        cy="17"
        r="12"
        stroke="black"
        stroke-width="1"
        fill="${color2}"
        class="circle"
  
      />
    </svg>
    <svg height="100" width="100">
      <circle
        cx="17"
        cy="17"
        r="12"
        stroke="black"
        stroke-width="1"
        fill="${color3}"
        class="circle"
      />
    </svg>      </div>
    
    `
   
}






export function renderToyBlock(){
    let opacity1 = 'opacity';
    let opacity2 = 'opacity';
    let opacity3 = 'opacity'; 

    if(arrTrueAnsw.length >= 3 ) opacity1 = "";
    if(arrTrueAnsw.length >= 6 ) opacity2 = "";
    if(arrTrueAnsw.length >= 9 ) opacity3 = "";
    
    toyBlock.innerHTML = `  <img
     src="./sprint/images/makaka1.png"
     class="card-img-top png-image"
     alt="crab"
   />
   <img
     src="./sprint/images/makaka2.png"
     class="card-img-top1 png-image ${opacity1}"
     alt="duck"
   />
   <img
     src="./sprint/images/makaka3.png"
     class="card-img-top2 png-image ${opacity2}"
     alt="poni"
   />
   <img
     src="./sprint/images/makaka4.png"
     class="card-img-top3 png-image ${opacity3}"
     alt="sheep"
   />
    `
}


//render category page

export const  renderCategoryPage = () => {
  const html =`
  <div class="card" style="width: 50%">
  <div class="card-bodys">
  <h5 class="game-title">Игра спринт</h5>
    <h5 class="card-title">Выберите сложность</h5>
    <p class="card-text">От простого к сложному</p>
    <div class="button-category-block">
      <button type="button" class="btn btn-danger button-category but1">
        1
      </button>
      <button type="button" class="btn btn-warning button-category but2">
        2
      </button>
      <button type="button" class="btn btn-success button-category but3">
        3
      </button>
      <button type="button" class="btn btn-info button-category but4">4</button>
      <button type="button" class="btn btn-primary button-category but5">
        5
      </button>
      <button type="button" class="btn btn-light button-category but6">6</button>
    </div>
  </div>
</div>
  `
  const div = document.createElement('div');
  let main = document.querySelector('.main');
  main.innerHTML = html;
  main.appendChild(div);
  
  selectCategory()
}
let startButton = document.querySelector('.sprint_link');
startButton.addEventListener('click', renderCategoryPage);

export { numberWordsEng };

let averResult;
let record;

function locolStor(){
  if(localStorage.getItem('record') < count){
    console.log(count)
    localStorage.removeItem('record');
    localStorage.setItem('record', count);
  }
}

localStorage.setItem('averResult', 0);
localStorage.setItem('record', []);




export const  renderResultsPage = () =>{
  locolStor();
  const html =`
  <div class="card" style="width: 50%">
  <h6 class="card-title">Ваш результат ${count}</h6>

  <div class="card-bodys">
    
    <div class="sprint-results"></div>
  </div>
</div>
  `


  let main = document.querySelector('.main');
  main.innerHTML = html;
    let sprintResults = document.querySelector('.sprint-results'); 
    let ul = document.createElement('div');
    sprintResults.append(ul);

   for(let i = 1; i <= numberWordsEng; i++){
    let li = document.createElement('div');
    li.innerHTML = `<div class="results-block">
    <img src="./sprint/images/sound.png" alt="sound" class="results-img" data-number="${i-1}" id='sound-image${i-1}'>
    <h5 class="engWord">${arrayEng[i-1]}</h5>
    <p class="transr">${arrayTranscr[i-1]}</p>
    <h5 class="rusWords">${arrayRus[i-1]}</h5>
    <img src="./sprint/images/${arrBoolenAnswear[i-1]}.png" alt="boolen" class="boolenImage">
  </div>`;
    ul.append(li);
  
  
   }

   
    document.addEventListener('mousedown', function(e){
    
     if(e.target.dataset.number){
      numberWordsEng =  e.target.dataset.number;
      e.target.id = 'sound-image';
    }
      playAudio();
      e.target.id = '';
   } ) 
    

 }




 export {numberWordsRus, numberWordsEng, sum}; 