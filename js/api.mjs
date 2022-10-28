import { setLocalStorage } from "./storage.js";
import { removeLocalStorage } from "./storage.js";
import { getTokenStorage } from "./storage.js";
import { list, users } from "./home.mjs";

window.addEventListener("DOMContentLoaded", () => {
  let user_name;
  let password;

  const token = getTokenStorage();
  users(token).then((res) => {
    const usersList = res.data.result.user;
    list(token, usersList);
  });

  const username = document.getElementById("username");
  username?.addEventListener("keyup", (e) => {
    user_name = e.target.value;

    const psw = document.getElementById("psw1");
    psw.addEventListener("keyup", (e) => {
      password = e.target.value;
    });
  });

  const formdocument = document.getElementById("form");
  formdocument?.addEventListener("submit", (e) =>
    signup(e, user_name, password)
  );

  const formlogin = document.getElementById("formlogin");
  formlogin?.addEventListener("submit", (e) => {
    e.preventDefault();
    login(e, user_name, password);
  });

  const deco = document.getElementById("logout");
  deco?.addEventListener("click", () => {
    logout();
  });
});

export async function signup(e, user_name, password) {
  e.preventDefault();
  return await axios
    .get(
      `http://greenvelvet.alwaysdata.net/bugTracker/api/signup/${user_name}/${password}`,
      {}
    )
    .then(function (response) {
      let txterror = document.getElementById("error");
      if (response.data.result.status == "failure") {
        txterror.innerHTML = `<p style='color: red'>${response.data.result.message}</p>`;
      } else {
        setLocalStorage("token", response.data.result.token);
        setLocalStorage("id", response.data.result.id);
        document.location.href = "/rendu/index.html";
      }
    })
    .catch(function (error) {
      console.error(error);
    });
}

export async function login(e, user_name, password) {
  e.preventDefault();
  return await axios
    .get(
      `http://greenvelvet.alwaysdata.net/bugTracker/api/login/${user_name}/${password}`,
      {}
    )
    .then(function (response) {
      setLocalStorage("token", response.data.result.token);
      setLocalStorage("id", response.data.result.id);
      document.location.href = "./views/home.html";
    })
    .catch(function (error) {
    });
}

export async function logout(token) {
  return await axios
    .get(`http://greenvelvet.alwaysdata.net/bugTracker/api/logout/${token}`, {})
    .then(function (response) {
      removeLocalStorage("id");
      removeLocalStorage("token");
      document.location.href = "../index.html";
    })
    .catch(function (error) {
    });
}

export async function updatestate(token, bug_id, new_state) {
  return await axios
    .get(
      `http://greenvelvet.alwaysdata.net/bugTracker/api/state/${token}/${bug_id}/${new_state}`
    )
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
}
