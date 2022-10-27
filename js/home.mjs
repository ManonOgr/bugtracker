
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

export async function list(token, usersList){
    console.log("ola");
    return await axios
    .get(`http://greenvelvet.alwaysdata.net/bugTracker/api/list/${token}/0
    `)
    .then(function (response) {
      console.log(response);
      let tbody = document.querySelector('tbody')
      const arr = response.data.result.bug
      console.log(arr)
      arr.map((val) =>{
tbody.innerHTML +=
 `<tr>
  <td>${val.title} </br> ${val.description}</td>
  <td>${new Date(val.timestamp*1000).toLocaleDateString()}</td>
  <td>${usersList[val.user_id]}</td>
  <td> <select>
  <option value"0" ${val.state == 0?"selected" :""}>A traiter</option>
  <option value"1" ${val.state == 1?"selected" :""}>En cours</option>
  <option value"2" ${val.state == 2?"selected" :""}>Traité</option>
   </select>
  ${val.state}</td>
  <td id="delete" value="${val.id}"> <button> supprimer</button> </td>
</tr>`


      })

    })
    .catch(function (error) {
      console.log(error);
    });
  }