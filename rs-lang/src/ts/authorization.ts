import { BASE_LINK, LocalStorageKey } from "./settings";

const getUser = async (token: string, userId: string) => {
  const response = await fetch(`${BASE_LINK}/users/${userId}`, {
    method: 'GET',
    // withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  if (response.ok) {
    return true;
  }
  return false;
};

const clearLocalStorage = () => {
  [LocalStorageKey.token, LocalStorageKey.id, LocalStorageKey.name].forEach((el) => {
    localStorage.removeItem(el);
  });
};

const authorization = async () => {
  const token = localStorage.getItem(LocalStorageKey.token);
  const userId = localStorage.getItem(LocalStorageKey.id);
  const userName = localStorage.getItem(LocalStorageKey.name);

  if (token && userId && userName) {
    const isTokenValid = await getUser(token, userId);
    if (isTokenValid) {
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
    }
  } else {
    clearLocalStorage();
  }
};

export default authorization;
