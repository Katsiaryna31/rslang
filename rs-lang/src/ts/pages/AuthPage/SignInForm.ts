import Component from "../../templates/Component";
import SignInPresenter from "./SignInPresenter";

export default class SignInForm {
  private presenter: SignInPresenter = new SignInPresenter(this);

  public node: HTMLElement;

  private loginErrorMessage = new Component('p', 'auth__error', 'Неверное имя пользователя или пароль').node;

  private emailInput = new Component<HTMLInputElement>(
    'input',
    'auth__input',
    '',
    { type: 'email', placeholder: 'E-mail', 'data-err': 'Введите email' },
  ).node;

  private passwordInput = new Component<HTMLInputElement>(
    'input',
    'auth__input',
    '',
    {
      type: 'password',
      placeholder: 'Пароль',
      autocomplete: 'true',
      'data-err': 'Введите пароль',
    },
  ).node;

  private btn = new Component<HTMLInputElement>('button', 'auth__btn', 'Войти').node;

  constructor() {
    const form = new Component('form', 'auth__form').node;

    const inputs = [this.emailInput, this.passwordInput];
    inputs.forEach((el) => {
      const inputContainer = new Component('div', 'auth__wrap').node;
      const errorMessage = new Component('div', 'invalid-data-message', `${el.dataset.err}`).node;
      el.addEventListener('input', () => {
        this.checkValidity(el);
      });
      inputContainer.append(el, errorMessage);
      form.append(inputContainer);
    });

    this.btn.onclick = (e) => {
      e.preventDefault();
      inputs.forEach(this.checkValidity);
      if (inputs.every(this.checkValidity)) {
        const user = {
          email: this.emailInput.value,
          password: this.passwordInput.value,
        };
        this.btn.disabled = true;
        this.presenter.onSignIn(user);
      }
    };

    form.append(this.btn, this.loginErrorMessage);
    this.node = form;
  }

  checkValidity(input: HTMLInputElement) {
    if (!input.value) {
      input.classList.add('invalid');
      return false;
    }
    input.classList.remove('invalid');
    return true;
  }

  showLoginErrorMessage() {
    this.loginErrorMessage.classList.add('visible');
  }

  enableButton() {
    this.btn.disabled = false;
  }
}
