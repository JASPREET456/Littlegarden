window.onload = () => {
  getProducts();
};

const getProducts = () => {
  fetch(`http://localhost:8080/products`)
    .then((res) => res.json())
    .then((res) => {
      res.forEach((el) => {
        console.log(el);
        elem = `<div class="col-4 mb-2"><div class="shadow-lg p-2">
           <img src="../assets/store/${el.imageName}"  class="w-100" alt="Watering Can" />
          <div class="titles">
            <h4>${el.name} <span class="h6 fw-light">${el.cost}</span></h4>
          </div>
          <form class="update d-flex item-update-form">
            <input disabled name="productId" value="${el.productId}" class="w-0 h-0 visually-hidden"/>
            <input disabled name="desc" value="${el.desc}" class="w-0 h-0 visually-hidden"/>
            <input disabled name="imageName" value="${el.imageName}" class="w-0 h-0 visually-hidden"/>
            <input
            required
              type="float"
              name="cost"
              class="form-control mx-1"
              placeholder="New Price"
              oninvalid="this.setCustomValidity('Enter The previous Price.')"
       onvalid="this.setCustomValidity('')"
            />
            <input
            required
              type="text"
              name="name"
              class="form-control mx-1"
              oninvalid="this.setCustomValidity('Enter The previous name.')"
       onvalid="this.setCustomValidity('')"
              placeholder="Name (Enter Old if not willing to update"
            />
            <button type="submit" class="btn btn-primary rounded" onclick="
              handleEditClick" data-arg1=${el.productId}>Edit</button>
          </form>
          </div>`;
        document.getElementById("item-list").innerHTML += elem;
        elems = document.querySelectorAll("form.item-update-form");
        elems.forEach((el) => {
          el.addEventListener("submit", (e) => {
            e.preventDefault();
            let cost = el.cost.value;
            let id = el.productId.value;
            let desc = el.desc.value;
            let imageName = el.imageName.value;
            let name = el.name.value;
            handleEditClick(id, desc, cost, imageName, name);
          });
        });
      });
    });
};

const handleEditClick = (id, desc, cost, imageName, name) => {
  const DATA = {
    productId: id,
    desc,
    cost,
    imageName,
    name,
  };
  console.log(DATA);
  fetch("http://localhost:8080/product/update", {
    method: "post",
    body: JSON.stringify(DATA),
    headers: {
      "content-type": "application/json",
    },
  })
    .then(() => location.reload())
    .catch((e) => {
      console.log(e);
      alert("Could Not Update. Try Again");
    });
};
