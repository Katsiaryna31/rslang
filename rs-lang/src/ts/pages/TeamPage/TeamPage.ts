import Component from '../../common/Component';
import Page from '../../common/Page';

class TeamPage extends Page {
    render() {
      document.body.className = 'body body_level5';
      const page = new Component('div', 'team-page', '').node;

      const title = new Component('h1', 'team-page-title', 'О команде ').node;  

      const pageContainer = new Component('div', 'team-page-container', '');
      
      const pageContainerElement = pageContainer.node;
      page.append(title);

      const teamCards = new Component('div', 'team-cards', '').node;
      pageContainerElement.append(teamCards);

      const block1 = new Component('div', 'team-page-block', '').node;
      const image1 = new Component('img', 'image-page', '',{src: 'images/ava1.png'}).node;
      const name1 = new Component('p', 'name-team-page', 'Екатерина Якубовская').node;
      const fill1 = new Component('p', 'fill-team-page', '1. Мини-игра Аудиовызов \n 2. Страница статистики \n 3. Создание копии бэкенда \n 4. Создание репозитория' ).node;
      const link1 = new Component('a', 'image-page-link', 'Katsiaryna31', {href:'https://github.com/Katsiaryna31'}).node;
      const image1Left = new Component('img', 'image-page-github', '',{src: 'images/github.svg'}).node;

     
      block1.append(image1, name1, link1, fill1 );
      link1.append(image1Left);


      const block2 = new Component('div', 'team-page-block', '').node;
      const image2 = new Component('img', 'image-page', '', {src: 'images/ava2.png'}).node;
      const name2 = new Component('p', 'name-team-page', 'Юлия Волчек').node;
      const fill2 = new Component('p', 'fill-team-page','1. Электронный учебник \n 2. Авторизация пользователя \n 3. Список слов \n 4. Прогресс изучения \n 5. Изученные слова').node;
      const link2 = new Component('a', 'image-page-link', 'yuliya-v',{href:'https://github.com/yuliya-v'}).node;
      const image2Left = new Component('img', 'image-page-github', '',{src: 'images/github.svg'}).node;

      block2.append(image2, name2, link2, fill2);
      link2.append(image2Left);

      const block3 = new Component('div', 'team-page-block', '').node;
      const image3 = new Component('img', 'image-page', '', {src: 'images/ava3.png'}).node;
      const name3 = new Component('p', 'name-team-page', 'Юрий Шпаковский').node;
      const fill3 = new Component('p', 'fill-team-page','1. Мини-игра Спринт  \n 2. Страница о команде').node;
      const link3 = new Component('a', 'image-page-link', 'Clukva', {href:'https://github.com/clukva'}).node;
      const image3Left = new Component('img', 'image-page-github', '',{src: 'images/github.svg'}).node;

      block3.append(image3, name3, link3, fill3);
      link3.append(image3Left);

      pageContainerElement.append(block1 , block2, block3 );
  
      page.append(pageContainerElement);  
      return page;
    }
  }
  
  export default new TeamPage();