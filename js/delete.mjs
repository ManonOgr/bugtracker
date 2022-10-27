



export async function del(token, bugId){
  console.log(token, bugId);
    console.log("ola");
    return await axios
    .get(`http://greenvelvet.alwaysdata.net/bugTracker/api/delete/${token}/${bugId}`)
    .then(function (response) {
      return response
    })
    .catch(function (error) {
      console.log(error);
    });
  }