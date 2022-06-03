window.onload = () => {
  var adminLoginBtn = document.querySelector("#admin-login-btn");
  adminLoginBtn.addEventListener("click", handleAdminLogin);

  localStorage.removeItem("User");
};

const handleAdminLogin = () => {
  const email = document.querySelector("#admin-email").value;
  const password = document.querySelector("#admin-password").value;
  const data = {
    email: email,
    password: password,
  };
  if (email.length < 14 || password.length < 6) {
    alert("The values are too short, please verify the details");
    return;
  }
  console.log(data);
  const DATA = JSON.stringify(data);
  var login = fetch("http://localhost:8080/admin/login", {
    method: "post",
    body: DATA,
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

      window.location.href = "admin-home.html";
    })
    .catch((e) => {
      alert("Error while logging in. Make sure The credentials are correct");
    });
};
