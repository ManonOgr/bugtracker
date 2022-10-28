export function getTokenStorage() {
  return window.localStorage.getItem("token");
}
export function getUserIdStorage() {
  return window.localStorage.getItem("id");
}
export function setLocalStorage(key, data) {
  localStorage.setItem(key, data);
}

export function removeLocalStorage(key) {
  return window.localStorage.removeItem(key);
}
