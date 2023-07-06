const addToCartButtons = document.getElementsByClassName("add-to-cart-button");
Array.from(addToCartButtons).forEach((button) => {
  button.addEventListener("click", async (event) => {
    const productId = event.target.id;
    const data = {
      productId: productId,
    };
    fetch("/api/products/addProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result.message);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  });
});
