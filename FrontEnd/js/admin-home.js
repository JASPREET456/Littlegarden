window.onload = () => {
  getAllUsers();
  document
    .querySelector("#background-close-btn")
    .addEventListener("click", () => {
      document.querySelector("#background").style.visibility = "hidden";
    });
};

const getAllUsers = () => {
  fetch("http://localhost:8080/users")
    .then((data) => data.json())
    .then((res) => {
      const elem = document.querySelector("#user-card-row");
      res.map((el) => {
        const card = `
          <div class="col-4 my-2">
            <div class="d-flex shadow-lg justify-content-between align-items-center p-2">
              <div class="titles">
                <h4>${el.fullName ? el.fullName : "John Doe"}</h4>
                <h6 class="fw-light">${el.email}</h6>
              </div>
              <div class="icon">
                <button class="btn btn-primary rounded" onclick="handleEditClick(${
                  el.userId
                })">Edit</button>
              </div>
            </div>
          </div>
        `;
        elem.innerHTML += card;
      });

      console.log(res);
    });
};
const handleEditClick = (num) => {
  document.querySelector("#background").style.visibility = "visible";
  document.querySelector("#update-submit").addEventListener(
    "click",
    () => {
      handleSubmitClick(num);
    },
    false
  );
};

const handleSubmitClick = (num) => {
  const email = document.querySelector("#new-user-email").value;
  const fullName = document.querySelector("#new-user-name").value;
  console.log(num);
  if (email.length < 14 || fullName.length === 0) {
    alert("Provide valid credentials");
    window.location.reload();
    return;
  }

  handleUpdateSubmit(num, email, fullName);
};

const handleUpdateSubmit = (id, email, name) => {
  const DATA = {
    userId: id,
    email: email,
    fullName: name,
  };
  fetch("http://localhost:8080/update", {
    method: "PUT",
    body: JSON.stringify(DATA),
    headers: {
      "content-type": "application/json",
    },
  })
    .then(() => {
      window.location.reload();
    })
    .catch((e) => alert("An Unexpected Error occured."));
};
