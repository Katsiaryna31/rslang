import { SignInData } from "./pages/AuthPage/AuthModel";
import { BASE_LINK, LocalStorageKey } from "./settings";

const updateToken = async (token: string, userId: string) => {
  const response = await fetch(`${BASE_LINK}/users/${userId}/tokens`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  if (response.ok) {
    const data: SignInData = await response.json();
    localStorage.setItem(LocalStorageKey.token, data.token);
    localStorage.setItem(LocalStorageKey.refreshToken, data.refreshToken);
    return true;
  }
  return false;
};

const clearLocalStorage = () => {
  [LocalStorageKey.token, LocalStorageKey.id, LocalStorageKey.name, LocalStorageKey.refreshToken].forEach((el) => {
    localStorage.removeItem(el);
  });
};

const authorization = async () => {
  const token = localStorage.getItem(LocalStorageKey.token);
  const refreshToken = localStorage.getItem(LocalStorageKey.refreshToken);
  const userId = localStorage.getItem(LocalStorageKey.id);
  const userName = localStorage.getItem(LocalStorageKey.name);

  if (token && refreshToken && userId && userName) {
    const isUserLoggedIn = await updateToken(refreshToken, userId);
    if (isUserLoggedIn) {
      const userNameElem = document.querySelector('.user-name') as HTMLElement;
      const signOutElem = document.querySelector('.sign-out') as HTMLElement;
      const signInElem = document.querySelector('.sign-in') as HTMLElement;
      userNameElem.style.display = 'block';
      userNameElem.innerHTML = userName;
      signOutElem.style.display = 'block';
      signInElem.style.display = 'none';

      signOutElem.onclick = () => {
        clearLocalStorage();
        window.location.reload();
      };
    } else {
      clearLocalStorage();
    }
  } else {
    clearLocalStorage();
  }
};

export default authorization;
