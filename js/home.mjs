import { updatestate } from "./api.mjs";
import { del } from "./delete.mjs";
import { getTokenStorage, getUserIdStorage } from "./storage.js";

let bugList = [];
let usersL = [];
export async function users(token) {
  return await axios
    .get(
      `http://greenvelvet.alwaysdata.net/bugTracker/api/users/${token}
  `
    )
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
    });
}

const tbody = document.querySelector("tbody");

tbody?.addEventListener("click", (event) => {
  if (event.target.id == "delete") {
  }
});

tbody?.addEventListener("change", (event) => {
  if (event.target.id == "selectstate") {
    const bugId = event.target.dataset.bugId;
    const newState = event.target.value;
    const token = getTokenStorage();
    updatestate(token, bugId, newState)
      .then((res) => {
        if (res.data.result.status == "done") {
          alert("bug a jour");
        } else {
          alert("bug non a jour");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }
});
export async function list(token, usersList) {
  usersL = usersList;
  const currentPage = window.location.href.split("/").reverse()[0].split(".")[0];
  const user_id = getUserIdStorage();

  return await axios
    .get(
      `http://greenvelvet.alwaysdata.net/bugTracker/api/list/${token}/${currentPage == "traitement"  ? user_id : "0"}
    `
    )
    .then(function (response) {

      bugList = response.data.result.bug;
      generateBugList(bugList, usersList);
      modalEvent(bugList, usersList);
    })
    .catch(function (error) {
    });
}

export async function userlist(token, usersList) {
  usersL = usersList;
  return await axios
    .get(
      `http://greenvelvet.alwaysdata.net/bugTracker/api/list/${token}/0
    `
    )
    .then(function (response) {

      bugList = response.data.result.bug;
      generateBugList(bugList, usersList);
      modalEvent(bugList, usersList);
    })
    .catch(function (error) {
    });
}

function generateBugList(arr, usersList) {
  let tbody = document.querySelector("tbody");

  let buginprogress = 0;
  let bugdone = 0;
  let bugall = arr.length;

  if (tbody) {
    tbody.innerHTML = "";

    arr.map((val) => {
      if (val.state == 1) {
        buginprogress++;
      }

      if (val.state == 2) {
        bugdone++;
      }

      tbody.innerHTML += `<tr>
      <td class="breack">${val.title} </br> ${val.description}</td>
      <td class="px-5">${new Intl.DateTimeFormat("fr-FR", {
        dateStyle: "full",
        timeStyle: "medium",
      }).format(val.timestamp * 1000)}</td>
      <td>${usersList[val.user_id]}</td>
      <td> 
      <select id="selectstate" data-bug-id="${val.id}">
      <option value="0" ${val.state == 0 ? "selected" : ""}>A traiter</option>
      <option value="1" ${val.state == 1 ? "selected" : ""}>En cours</option>
      <option value="2" ${val.state == 2 ? "selected" : ""}>Traité</option>
      </select></td>
      <td> <button id="delete" class="btndelete btn btn-outline-danger"" value="${
        val.id
      }"> supprimer</button> </td>
      </tr>`;
    });
    document.querySelector(".txtbug").innerHTML =
      "bugs en cours : " + buginprogress;
    document.querySelector(".txtbugdone").innerHTML = "bugs traités : " + bugdone;
    document.querySelector(".txtbugall").innerHTML = "tous les bugs : " + bugall;
  }
}
function modalEvent(bugList, userL) {
  const button = document.querySelectorAll(".btndelete");
  const modalDelete = document.querySelector("#dlgdelete");
  const modalClose = document.querySelector("#dlgcancel");
  const dialog = document.querySelector("dialog");
  const token = getTokenStorage();
  const list = bugList;
  const listuser = userL;
  let bugId;
  button.forEach((btn) => {
    btn?.addEventListener("click", (e) => {
      bugId = e.target.value;
      dialog.showModal();
    });
  });
  modalDelete?.addEventListener("click", () => {
    deleteFromTable(token, bugId, list, listuser);
    dialog.close();
  });
  modalClose?.addEventListener("click", () => {
    dialog.close();
  });
}

async function deleteFromTable(token, bugId, bugList, userNameList) {
  const { data } = await del(token, bugId);
  if (data.result.status === "done") {
    const newBugList = bugList.filter((bug) => bug.id !== bugId);
    generateBugList(newBugList, userNameList);
  }
}
