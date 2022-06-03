window.onload = () => {
  getAllProducts();
};

const getAllProducts = () => {
  fetch("http://localhost:8080/products")
    .then((data) => data.json())
    .then((res) => {
      console.log(res);
      const row = document.querySelector("#product-row");
      console.log(row);
      res.forEach((el) => {
        const elem = `<div class="col-8">
          <div class="custom-card d-flex align-items-center mb-2 border">
            <div class="col p-1">
              <img
                src="./assets/store/${el.imageName}"
                class="w-100"
                alt="Image"
              />
            </div>
            <div class="col p-1">
              <div class="d-flex flex-column justify-content-between h-100">
                <div class="pb-2 border-bottom mb-2">
                  <h4 class="product-title">${el.name}</h4>
                  <h3 class="fw-light product-price">$${el.cost}</h3>
                  <div class="details"><strong>${
                    el.desc.split(":")[0]
                  }</strong> ${el.desc.split(":")[1]}</div>
                </div>
                <form class="input-group cartSubmitForm" id="cart-${
                  el.productId
                }">
                  <input
                    type="number"
                    name="quantity"
                    class="form-control"
                    value="1"
                    min="1"
                  />
                  <input class="h-0 w-0 visually-hidden" name="productId" disabled value="${
                    el.productId
                  }"/>
                  <button class="btn btn-primary" type="submit">
                    Add to cart
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>`;
        row.innerHTML += elem;
      });
      elems = document.querySelectorAll("form.cartSubmitForm");
      elems.forEach((el) => {
        el.addEventListener("submit", (e) => {
          e.preventDefault();
          let q = el.quantity.value;
          let id = el.productId.value;
          handleAddtoCart(q, id);
        });
      });
    })
    .catch((e) => alert("An error occured. Please try again."));
};

const handleAddtoCart = (q, id) => {
  const DATA = {
    productId: id,
    userId: JSON.parse(localStorage.getItem("User")).userId,
    count: parseInt(q),
  };
  console.log(DATA);
  fetch("http://localhost:8080/cart/add", {
    method: "post",
    body: JSON.stringify(DATA),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      document.getElementById("Success-message").style.opacity = "1";
      setTimeout(() => {
        document.getElementById("Success-message").style.opacity = "0";
      }, 1000);
    });
};
