import Component from "../../common/Component";
import Page from "../../common/Page";
import RegisterForm from "./RegisterForm";
import SignInForm from "./SignInForm";

export class AuthPage extends Page {
  render() {
    const container = new Component('div', 'auth').node;

    const nav = new Component('div', 'auth__head').node;
    const signInLink = new Component('button', 'auth__link active', 'Вход').node;
    const registerLink = new Component('button', 'auth__link', 'Регистрация').node;
    nav.append(signInLink, registerLink);

    const signInForm = new SignInForm().node;
    const registerForm = new RegisterForm().node;
    container.append(nav, signInForm, registerForm);

    signInLink.onclick = () => {
      signInForm.style.display = '';
      registerForm.style.display = 'none';
      signInLink.classList.add('active');
      registerLink.classList.remove('active');
    };

    registerLink.onclick = () => {
      signInForm.style.display = 'none';
      registerForm.style.display = '';
      signInLink.classList.remove('active');
      registerLink.classList.add('active');
    };
    // document.body.classList.add('body_level1');
    return container;
  }
}

export default new AuthPage();
