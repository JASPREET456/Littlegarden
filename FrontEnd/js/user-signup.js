window.onload = () => {
  var userSignupBtn = document.querySelector("#user-signup-btn");
  userSignupBtn.addEventListener("click", handleUserSignup);

  localStorage.removeItem("User");
};
let user;
const handleUserSignup = () => {
  console.log("WORK");
  var fullName = document.querySelector("#user-signup-name").value;
  var createdOn = new Date().toISOString();
  var email = document.querySelector("#user-signup-email").value;
  var password = document.querySelector("#user-signup-password").value;

  if (email.length < 14) {
    alert("The email is too short, please verify the details");
    return;
  } else if (fullName.length === 0) {
    alert("The name is too short, please verify the details");
    return;
  } else if (password.length < 6) {
    alert("The password is too short, please verify the details");
    return;
  }

  const DATA = {
    fullName,
    createdOn,
    email,
    password,
  };
  console.log(DATA);
  var login = fetch("http://localhost:8080/user/signup", {
    method: "post",
    body: JSON.stringify(DATA),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data.userId) {
        alert("Unexpected Error. Please Try again.");
        return;
      }
      localStorage.setItem("User", JSON.stringify(data));
      window.location.href = "./index.html";
    })
    .catch((e) => {
      user = null;
      alert("Error while logging in. Make sure The credentials are correct");
    });
};
module.exports = user;
