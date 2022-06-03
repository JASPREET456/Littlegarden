window.onload = () => {
  getCartItems();
};

const getCartItems = () => {
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
        let elem = `<div class="card-body">
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

           <button
             type="button"
             class="btn btn-primary btn-sm me-1 mb-2"
             data-mdb-toggle="tooltip"
             title="Remove item"
           >
             <svg
               xmlns="http://www.w3.org/2000/svg"
               x="0px"
               y="0px"
               width="24"
               height="24"
               viewBox="0 0 24 24"
               style="fill: #fff"
             >
               <path
                 d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z"
               ></path>
             </svg>
           </button>
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
      document.getElementById("cart-total").innerHTML = total.toFixed(2);
      document.getElementById("main-total").innerHTML = (
        total +
        12 +
        (5 / 100) * total
      ).toFixed(2);
    })
    .catch((e) => console.log(e));
  console.log(user);
};
