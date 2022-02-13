import RegisterForm from "./RegisterForm";
import AuthModel from "./AuthModel";

export type UserData = {
  name: string,
  email: string,
  password: string,
};

export default class RegisterPresenter {
  constructor(private view: RegisterForm, private model = AuthModel) {
    this.view = view;
  }

  async onSubmit(userData: UserData) {
    const response = await this.model.createUser(userData);
    if (response === 417) {
      this.view.btn.disabled = false;
      this.view.showInvalidEmailMessage();
    } else {
      window.history.go();
    }
  }
}
