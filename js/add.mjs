import { getTokenStorage, getUserIdStorage } from "./storage.js";

export async function adddesc(token, user_id, newBug){
      console.log("ola");
      return await axios
      .post(`http://greenvelvet.alwaysdata.net/bugTracker/api/add/${token}/${user_id}`, newBug)
      .then(function (response) {
        console.log(response);
        return response;
      })
      .catch(function (error) {
          return error.response;
        console.log(error);
      });
}


const submitBtn = document.querySelector(".btnsubmit")

submitBtn.addEventListener("click", (event)=>{
    event.preventDefault();
    const title = document.querySelector("#title");
    const description = document.querySelector("#description");

    if (title.value.trim() !== "" && description.value.trim() !== "") {
        const newBug = {
            title: title.value,
            description: description.value,
        }
        const token = getTokenStorage();
        const user_id = getUserIdStorage();
        adddesc(token, user_id, JSON.stringify(newBug))
        .then(res => {
            if (res.data.result.status == "done") {
                alert("Bug ajouté")
                document.location.href = "./home.html";
            }else{
                alert("Bug non ajouté")
            }

        })
        .catch(err => alert(err.message))
    }
})