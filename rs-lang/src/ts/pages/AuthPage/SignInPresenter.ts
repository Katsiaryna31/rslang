import AuthModel from "./AuthModel";
import { UserData } from "./RegisterPresenter";
import SignInForm from "./SignInForm";

export default class SignInPresenter {
  constructor(private view: SignInForm, private model = AuthModel) {
    this.view = view;
  }

  async onSignIn(user: Omit<UserData, 'name'>) {
    const data = await this.model.loginUser(user);
    if (!data) {
      this.view.showLoginErrorMessage();
      this.view.enableButton();
    } else {
      this.model.saveUserToLocalStorage(data);
      window.location.replace(`${window.location.origin}/`);
    }
  }
}
