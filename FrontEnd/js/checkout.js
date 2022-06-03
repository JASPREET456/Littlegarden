window.onload = () => {
  const btn = document.querySelector("#payment-btn");
  btn.addEventListener("click", handleBtnClick);
  grabCart();
  // document
  //   .querySelector("#background-close-btn")
  //   .addEventListener("click", () => {
  //     document.querySelector("#message-display").style.opacity = "0";
  //     document.querySelector("#message-display").style.pointerEvents = "none";
  //   });
};

const handleBtnClick = () => {
  document.querySelector("#message-display").style.pointerEvents = "all";
  document.querySelector("#message-display").style.opacity = "1";
  setTimeout(() => {
    // window.location = "./index.html";
  }, 2000);
};

const grabCart = () => {
  const user = JSON.parse(localStorage.getItem("User"));
  if (!user.userId) {
    alert("You have unexpectdly been logged out. Please Log in again");
    localStorage.removeItem("User");
    window.location = "./login.html";
  }
  let total = 0;
  fetch(`http://localhost:8080/cart/${user.userId}`)
    .then((res) => res.json())
    .then((data) => {
      let cartRow = document.getElementById("cart-row");
      console.log(data);
      data.cartData.forEach((el) => {
        total += parseFloat(el.product.cost) * parseFloat(el.quantity);
        let elem = `<div class="card-body ">
       <div class="row">
         <div class="col-lg-3 col-md-12 mb-4 mb-lg-0">
           <div
             class="bg-image hover-overlay hover-zoom ripple rounded"
             data-mdb-ripple-color="light"
           >
             <img
               src="./assets/store/${el.product.imageName}"
               class="w-100"
             />
             
           </div>
         </div>

         <div class="col-lg-5 col-md-6 mb-4 mb-lg-0">
           <p><strong>${el.product.name}</strong></p>
           <p class="description"><b>${el.product.desc.split(":")[0]}</b> ${
          el.product.desc.split(":")[1]
        }</p>

           
         </div>

         <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
           <p class="text-start text-md-center">
             Quantity: ${el.quantity} <br />
             <strong>$${el.product.cost}</strong>
           </p>
         </div>
       </div>
     </div>`;
        cartRow.innerHTML += elem;
      });
      document.getElementById("total-price").innerHTML = (
        total +
        12 +
        (5 / 100) * total
      ).toFixed(2);
    })
    .catch((e) => console.log(e));
  console.log(user);
};
