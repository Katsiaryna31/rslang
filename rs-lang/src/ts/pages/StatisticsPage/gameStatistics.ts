import { Statistics } from "../../common/wordInterfaces";
import { BASE_LINK, LocalStorageKey } from "../../settings";

const userId = localStorage.getItem(LocalStorageKey.id) || '';
const token = localStorage.getItem(LocalStorageKey.token) || '';

export async function updateGameStatistics(){
    let response = await fetch(`${BASE_LINK}/users/${userId}/statistics`, {
      method: 'GET',
    });
    if (response.ok) {
      const content:Statistics = await response.json();
      return content;
    }
    return null;
}