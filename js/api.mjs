import { setLocalStorage } from "./storage.js";
import { removeLocalStorage } from "./storage.js";
import { getTokenStorage } from "./storage.js";
import { list, users } from "./home.mjs";

window.addEventListener("DOMContentLoaded", () => {
  let user_name;
  let password;

  const token = getTokenStorage();
  users(token)
  .then(res => {
    const usersList = res.data.result.user;
    list(token,usersList );
  })
  

  const username = document.getElementById("username");
  username?.addEventListener("keyup", (e) => {
    user_name = e.target.value;
    console.log(e.target.value);

    const psw = document.getElementById("psw1");
    psw.addEventListener("keyup", (e) => {
      console.log(e.target.value);
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
    console.log("hello");
    login(e, user_name, password);
  });

  const deco = document.getElementById("logout");
  deco?.addEventListener("click", () => {
    console.log("logout");
    logout();
    console.log("chat");
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
      console.log(response);
      let txterror = document.getElementById("error");
      console.log(txterror);
      if (response.data.result.status == "failure") {
        console.log(response.data.result.status);
        txterror.innerHTML = `<p style='color: red'>${response.data.result.message}</p>`;
      } else {
        //  (response.data.result.status == "done") {
        //     console.log(response.data.result.status);
        //     txterror.innerHTML = `<p style='color: green'>${response.data.result.message}</p>`;
        console.log(response);
        setLocalStorage("token", response.data.result.token);
        setLocalStorage("id", response.data.result.id);
      }
    })
    .catch(function (error) {
      console.error(error);
    });
}

export async function login(e, user_name, password) {
  console.log("bonjour");
  e.preventDefault();
  return await axios
    .get(
      `http://greenvelvet.alwaysdata.net/bugTracker/api/login/${user_name}/${password}`,
      {}
    )
    .then(function (response) {
      console.log(response);
      setLocalStorage("token", response.data.result.token);
      setLocalStorage("id", response.data.result.id);
      document.location.href = "./views/home.html";
    })
    .catch(function (error) {
      console.log(error);
    });
}

export async function logout(token) {
  console.log("ola");
  return await axios
    .get(`http://greenvelvet.alwaysdata.net/bugTracker/api/logout/${token}`, {})
    .then(function (response) {
      console.log(response);
      removeLocalStorage("id");
      removeLocalStorage("token");
      document.location.href = "../index.html";
    })
    .catch(function (error) {
      console.log(error);
    });
}

export async function updatestate(token, bug_id, new_state){
  return await axios
    .get(`http://greenvelvet.alwaysdata.net/bugTracker/api/state/${token}/${bug_id}/${new_state}`)
    .then(function (response) {
      console.log(response);
return response
    })
    .catch(function (error) {
      console.log(error);
      return error.response
    });
}
