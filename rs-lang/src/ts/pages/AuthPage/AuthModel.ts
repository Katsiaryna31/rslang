import { BASE_LINK, LocalStorageKey } from "../../settings";
import { UserData } from "./RegisterPresenter";

export type SignInData = {
  message: string,
  token : string,
  refreshToken: string,
  userId: string,
  name: string,
};

class Model {
  async createUser(userData: UserData) {
    await fetch(`${BASE_LINK}/users`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  }

  async loginUser(user: Omit<UserData, 'name'>) {
    try {
      const rawResponse = await fetch(`${BASE_LINK}/signin`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const content: SignInData = await rawResponse.json();
      return content;
    } catch (er) {
      return null;
    }
  }

  saveUserToLocalStorage(data: SignInData) {
    localStorage.setItem(LocalStorageKey.token, data.token);
    localStorage.setItem(LocalStorageKey.id, data.userId);
    localStorage.setItem(LocalStorageKey.name, data.name);
  }
}

export default new Model();
