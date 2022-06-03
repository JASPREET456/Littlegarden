const user = JSON.parse(localStorage.getItem("User"));

if (!user || !user.userId) {
  window.location = "./login.html";
}
