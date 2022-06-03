window.onload = () => {
  var userLoginBtn = document.querySelector("#user-login-btn");
  userLoginBtn.addEventListener("click", handleUserLogin);
  localStorage.removeItem("User");
};

const handleUserLogin = () => {
  console.log("WORK");
  var email = document.querySelector("#user-login-email").value;
  var password = document.querySelector("#user-login-password").value;

  if (email.length < 14) {
    alert("The email is too short, please verify the details");
    return;
  } else if (password.length < 6) {
    alert("The password is too short, please verify the details");
    return;
  }
  const DATA = {
    email,
    password,
  };
  console.log(DATA);
  var login = fetch("http://localhost:8080/login", {
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
      alert("Error while logging in. Make sure The credentials are correct");
    });
};
