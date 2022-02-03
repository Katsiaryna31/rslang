import Component from "../../core/templates/Component";
import PageTemplate from "../../core/templates/Page";
// import AuthPresentor from "./AuthPresentor";

class AuthPage extends PageTemplate {

  constructor(
    // private presentor = AuthPresentor
  ) {
    super();
  }

  render() {
    const container = new Component('div', 'auth').node;

    const nav = new Component('div', 'auth__head').node;
    const signInLink = new Component('button', 'auth__link active', 'Вход').node;
    const registerLink = new Component('button', 'auth__link', 'Регистрация').node;
    nav.append(signInLink, registerLink);

    const signInForm = this.createSignInForm();
    const registerForm = this.createRegisterForm();
    container.append(nav, signInForm, registerForm);

    signInLink.onclick = () => {
      signInForm.style.display = '';
      registerForm.style.display = 'none';
      signInLink.classList.add('active');
      registerLink.classList.remove('active');
    }

    registerLink.onclick = () => {
      signInForm.style.display = 'none';
      registerForm.style.display = '';
      signInLink.classList.remove('active');
      registerLink.classList.add('active');
    }
    // document.body.classList.add('body_level1');
    return container;
  }

  createSignInForm() {
    const form = new Component('form', 'auth__form').node;
    const emailInput = new Component('input', 'auth__input', '', { type: 'email', placeholder: 'E-mail' }).node;
    const passwordInput = new Component('input', 'auth__input', '', { type: 'password', placeholder: 'Пароль' }).node;
    const btn = new Component('button', 'auth__btn', 'Войти').node;
    form.append(emailInput, passwordInput, btn);
    return form;
  }

  createRegisterForm() {
    const form = new Component('form', 'auth__form', '', { style: 'display: none;' }).node;
    const nameInput = new Component('input', 'auth__input', '', { type: 'text', placeholder: 'Имя' }).node;
    const emailInput = new Component('input', 'auth__input', '', { type: 'email', placeholder: 'E-mail' }).node;
    const passwordInput = new Component('input', 'auth__input', '', { type: 'password', placeholder: 'Пароль' }).node;
    const btn = new Component('button', 'auth__btn', 'Зарегистрироваться').node;
    form.append(nameInput, emailInput, passwordInput, btn);
    return form;
  }
}

export default new AuthPage();