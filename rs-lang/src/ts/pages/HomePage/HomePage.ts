import Component from '../../common/Component';
import Page from '../../common/Page';

class HomePage extends Page {
  render() {
    document.body.className = 'body body_home';
    const wrapper = new Component('div', 'home-page__wrapper', '').node;
    const container = new Component('div', 'home-page', '').node;
    wrapper.append(container);
    container.innerHTML = `
    <section>
      <p class="home-page__header">Изучай английский с RSLang</p>
      <p class="home-page__string"><span class="home-page__string_bcg">Приложение для эффективного изучения иностранных слов. Зарегистрируйтесь, чтобы использовать все возможности</span></p>
    </section>
    <section class="features">
      <div class="feature">
        <div class="feature__img feature__img_book"></div>
        <div class="feature__header feature__header_book"> Учебник</div>
        <div class="feature__description">В учебнике собраны 3600 самых используемых в повседневной жизни слов. Слова разбиты на разделы по уровню сложности</div>
      </div>
      <div class="feature">
        <div class="feature__img feature__img_game"></div>
        <div class="feature__header feature__header_game">Игры</div>
        <div class="feature__description">2 увлекательные игры на развитие запоминания слов, восприятия на слух и перевода</div>
      </div>
      <div class="feature">
        <div class="feature__img feature__img_stats"></div>
        <div class="feature__header feature__header_stats">Статистика</div>
        <div class="feature__description">Отслеживайте свой прогресс в индивидуальной статистике, ставьте цели и вдохновляйся на достижение новых результатов каждый день!</div>
      </div>
    </section>
    `
    return wrapper;
  }
}

export default new HomePage();
