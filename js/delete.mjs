window.addEventListener("DOMContentLoaded", () => {
  
    const tbody = document.querySelector("tbody");

    tbody.addEventListener("click", (event) => {
        if (event.target.id = "delete") {
            const bugId = event.target.value
            console.log("del");
            del(bugId);
            console.log("chat");
        }
       
    });

  });



export async function del(bugId){
    console.log("ola");
    return await axios
    .get(`http://greenvelvet.alwaysdata.net/bugTracker/api/delete/${token}/${bugId}`)
    .then(function (response) {
      console.log(response);
      removeLocalStorage("id");
      removeLocalStorage("token");
    })
    .catch(function (error) {
      console.log(error);
    });
  }