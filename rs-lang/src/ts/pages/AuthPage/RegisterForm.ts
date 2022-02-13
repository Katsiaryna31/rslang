import Component from "../../common/Component";
import RegisterPresenter from "./RegisterPresenter";

export default class RegisterForm {
  presenter: RegisterPresenter = new RegisterPresenter(this);

  timer: ReturnType<typeof setTimeout> = setTimeout(() => {});

  btn = new Component<HTMLInputElement>('button', 'auth__btn', 'Зарегистрироваться').node;

  private invalidEmailMessage = new Component('p', 'auth__error auth__error_register', 'Пользователь с данным e-mail уже существует').node;

  public node: HTMLElement;

  constructor() {
    this.node = new Component('form', 'auth__form', '', { style: 'display: none;' }).node;

    const nameInput = new Component<HTMLInputElement>(
      'input',
      'auth__input',
      '',
      {
        type: 'text',
        placeholder: 'Имя',
        minlength: '1',
        'data-err': 'Введите имя',
      },
    ).node;

    const emailInput = new Component<HTMLInputElement>(
      'input',
      'auth__input',
      '',
      {
        type: 'email',
        placeholder: 'E-mail',
        maxlength: '30',
        'data-err': 'Введите корректный email-адрес',
      },
    ).node;

    const passwordInput = new Component<HTMLInputElement>(
      'input',
      'auth__input',
      '',
      {
        type: 'password',
        placeholder: 'Пароль',
        minlength: '8',
        autocomplete: 'true',
        'data-err': 'Пароль должен содержать не менее 8 символов',
      },
    ).node;

    const inputs = [nameInput, emailInput, passwordInput];
    inputs.forEach((el) => {
      const inputContainer = new Component('div', 'auth__wrap').node;
      const errorMessage = new Component('div', 'invalid-data-message', `${el.dataset.err}`).node;
      el.addEventListener('input', () => {
        clearTimeout(this.timer);
        this.timer = setTimeout(this.checkValidity, 800, el);
      });
      inputContainer.append(el, errorMessage);
      this.node.append(inputContainer);
    });

    this.btn.onclick = (e) => {
      e.preventDefault();
      inputs.forEach(this.checkValidity);
      if (inputs.every(this.checkValidity)) {
        const userData = {
          name: nameInput.value,
          email: emailInput.value,
          password: passwordInput.value,
        };
        this.btn.disabled = true;
        this.presenter.onSubmit(userData);
      }
    };

    this.node.append(this.btn, this.invalidEmailMessage);
  }

  checkValidity(input: HTMLInputElement) {
    if (!input.validity.valid || !input.value) {
      input.classList.add('invalid');
      return false;
    }
    input.classList.remove('invalid');
    return true;
  }

  showInvalidEmailMessage() {
    this.invalidEmailMessage.classList.add('visible');
  }
}
