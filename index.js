$("document").ready(function () {
  console.log("Hello World");

  let btnCreate = document.querySelector("#btnCreate");
  let btnProductModal = document.querySelector("#btnProductModal");
  btnCreate.onclick = function () {
    let floatingProductName = document.querySelector("#floatingProductName");
    let floatingPrice = document.querySelector("#floatingPrice");
    createProduct(floatingProductName.value, floatingPrice.value);
  };

  btnUpdate.onclick = function () {
    updateProduct(
      $(`#floatingUpdateProductName`).val(),
      $(`#floatingUpdatePrice`).val()
    );
  };

  btnProductModal.onclick = () => {
    $("#floatingProductName").val("");
    $("#floatingPrice").val("");
  };

  getProducts();
});

let productToUpdate = -1;

// CREATE
function createProduct(productName, productPrice) {
  if (!productName) return alert("Product Name is required");
  else if (!productPrice) return alert(`Product must have a price.`);

  let product = {
    name: productName,
    price: productPrice,
  };

  // Get the initial value of products array
  let products = localStorage.getItem("product");

  // Check if array is empty
  if (!products) products = [];
  else products = JSON.parse(products); // Parse to JSON object if not null.

  // Validate if product name is already existing.
  let productIsExisting = products.findIndex((p) => {
    return p.name == product.name;
  });

  if (productIsExisting >= 0)
    return alert(`${product.name} is already in the databse.`);

  products.push(product); // Add sa array
  localStorage.setItem("product", JSON.stringify(products)); // Update and save sa database
  getProducts();

  $("#btnCancelCreate").click(); // Close the modal
  alert(`${product.name} has been successfully added.`);
}

// READ
function getProducts() {
  $("#tbodyProducts").html("");

  // Get the initial value of products array
  let products = localStorage.getItem("product");

  // Check if array is empty
  if (!products) products = [];
  else products = JSON.parse(products); // Parse to JSON object if not null.

  products.forEach((p, i) => {
    if (!p.isDeleted)
      $("#tbodyProducts").append(
        `<tr>
        <td>${p.name}</td>
        <td>${p.price}</td>
        <td><button class="btn btn-primary" 
        data-bs-toggle="modal"
        data-bs-target="#updateProductModal" onclick="openUpdateModal(${i})">Update</button>
        <button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button></td>
      </tr>`
      );
  });
}

// UPDATE
function updateProduct(productName, productPrice) {
  // Get the initial value of products array
  let products = localStorage.getItem("product");
  // Check if array is empty
  if (!products) products = [];
  else products = JSON.parse(products); // Parse to JSON object if not null.

  if (!productName) return alert("Product Name is required");
  else if (!productPrice) return alert(`Product must have a price.`);

  products[productToUpdate].name = productName;
  products[productToUpdate].price = productPrice;

  localStorage.setItem("product", JSON.stringify(products)); // Update and save sa database
  getProducts();
  alert(`Product has been successfully updated.`);
}

function openUpdateModal(productIndex) {
  // Get the initial value of products array
  let products = localStorage.getItem("product");
  // Check if array is empty
  if (!products) products = [];
  else products = JSON.parse(products); // Parse to JSON object if not null.

  $(`#floatingUpdateProductName`).val(products[productIndex].name);
  $(`#floatingUpdatePrice`).val(products[productIndex].price);
  productToUpdate = productIndex;
}
// DELETE
function deleteProduct(productIndex) {
  // Get the initial value of products array
  let products = localStorage.getItem("product");
  // Check if array is empty
  if (!products) products = [];
  else products = JSON.parse(products); // Parse to JSON object if not null.

  products[productIndex].isDeleted = true;

  localStorage.setItem("product", JSON.stringify(products)); // Update and save sa database
  getProducts();
}
