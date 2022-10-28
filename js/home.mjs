import { del } from "./delete.mjs";
import { getTokenStorage } from "./storage.js";

let bugList= [];
let usersL = [];
export async function users(token){
  console.log("efierfhiu")
  return await axios
  .get(`http://greenvelvet.alwaysdata.net/bugTracker/api/users/${token}
  `)
  .then(function (response) {
    console.log(response);
    return response;
  })
  .catch(function (error) {
    console.log(error);
  });
}

const tbody = document.querySelector("tbody");

tbody?.addEventListener("click", (event) => {
    if (event.target.id == "delete") {
        const bugId = event.target.value

      
        const token = getTokenStorage();

        del(token, bugId)
        .then(res => {
          if (res.data.result.status == "done") {
            bugList = bugList.filter(bug => bug.id != bugId)
            generateBugList(bugList, usersL)
          }
        })
        console.log("chat");
    }
   
});
export async function list(token, usersList){
  usersL = usersList
    console.log("ola");
    return await axios
    .get(`http://greenvelvet.alwaysdata.net/bugTracker/api/list/${token}/0
    `)
    .then(function (response) {
      console.log(response);
      
      bugList = response.data.result.bug
      generateBugList(bugList, usersList)

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  function generateBugList(arr, usersList) {
    let tbody = document.querySelector('tbody')

    let buginprogress = 0;
    let bugdone = 0;
    let bugall = arr.length

    if (tbody) {

      tbody.innerHTML = "";

      arr.map((val) =>{
        if (val.state == 1) {
          buginprogress++;
        }

        if (val.state == 2) {
          bugdone++
        }



      tbody.innerHTML +=
      `<tr>
      <td class="breack">${val.title} </br> ${val.description}</td>
      <td>${new Intl.DateTimeFormat("fr-FR", {
        dateStyle: "full",
        timeStyle: "medium",
      }).format(val.timestamp * 1000)}</td>
      <td>${usersList[val.user_id]}</td>
      <td> 
      <select>
      <option value"0" ${val.state == 0?"selected" :""}>A traiter</option>
      <option value"1" ${val.state == 1?"selected" :""}>En cours</option>
      <option value"2" ${val.state == 2?"selected" :""}>Traité</option>
      </select>
      ${val.state}</td>
      <td> <button id="delete" value="${val.id}"> supprimer</button> </td>
      </tr>`
  
  
      })
      document.querySelector(".txtbug").innerHTML = "bugs en cours " + buginprogress
      document.querySelector(".txtbugdone").innerHTML = "bugs traités " + bugdone
      document.querySelector(".txtbugall").innerHTML = "tous les bugs " + bugall
    }
  }