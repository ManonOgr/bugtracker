export async function del(token, bugId) {
  return await axios
    .get(
      `http://greenvelvet.alwaysdata.net/bugTracker/api/delete/${token}/${bugId}`
    )
    .then(function (response) {
      return response;
    })
    .catch(function (error) {});
}
