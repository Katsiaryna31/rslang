
import { group, page } from './model';
import { makeQuestionsArray  } from './model';
import {array, arrayEng, arrayRus, arrayPron, arrayTranscr } from './model';
import { getRandomPage } from './utils';


// category page

export function selectCategory(){
    let buttonCat1 = document.querySelector('.but1');
    let buttonCat2 = document.querySelector('.but2');
    let buttonCat3 = document.querySelector('.but3');
    let buttonCat4 = document.querySelector('.but4');
    let buttonCat5 = document.querySelector('.but5');
    let buttonCat6 = document.querySelector('.but6');
    
    buttonCat1.addEventListener('click', goToPage1);
    buttonCat2.addEventListener('click', goToPage2);
    buttonCat3.addEventListener('click', goToPage3);
    buttonCat4.addEventListener('click', goToPage4);
    buttonCat5.addEventListener('click', goToPage5);
    buttonCat6.addEventListener('click', goToPage6);
  }

function goToPage1(){
    group = 0; 
    makeQuestionsArray(0);
    
}
function goToPage2(){
    group = 1; 
    makeQuestionsArray(1);
}
function goToPage3(){
    group = 2;
    makeQuestionsArray(2);
}
function goToPage4(){
    group = 3;
    makeQuestionsArray(3);
}
function goToPage5(){
    group = 4;
    makeQuestionsArray(4);
}
function goToPage6(){
    group = 5;
    makeQuestionsArray(5);
}





export async function addQuetions(){
    page = getRandomPage();
    //console.log(page)

 

  async function fetchWord(page, group) {
    const response = await fetch(
      `http://127.0.0.1:3000/words?page=${page}&group=${group}`
    );
    const items = await response.json();
    array = items;
    console.log(array)
 }
  
  await fetchWord(page, group);
  array.map((a) => arrayEng.push(a.word))
  array.map((a) => arrayRus.push(a.wordTranslate))
  array.map((a) => arrayPron.push(a.audio))
  array.map((a) => arrayTranscr.push(a.transcription))

/*   console.log(arrayTranscr)
 */
}