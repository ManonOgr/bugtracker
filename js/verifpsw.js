function validate() {
  var a = document.getElementById("psw1").value;
  var b = document.getElementById("psw2").value;

  if (a != b) {
    alert("Les mots de passe ne correspondent pas.");
    return false;
  } else {
    return false;
  }
}
