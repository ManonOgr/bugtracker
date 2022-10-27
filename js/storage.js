export function getTokenStorage() {
  return window.localStorage.getItem("token");
}

export function setLocalStorage(key,data) {
  localStorage.setItem(key, data);
}

export function removeLocalStorage(key) {
    return window.localStorage.removeItem(key);
  }

