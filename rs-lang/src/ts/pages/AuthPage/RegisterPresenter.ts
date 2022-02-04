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
    await this.model.createUser(userData);
    window.history.go();
  }
}
