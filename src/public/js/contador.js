// Obtener todos los elementos con la clase "increment"
const incrementButtons = document.querySelectorAll(".increment");

const pCartId = document.querySelector(".cart").dataset.cartId;

console.log(pCartId);
// Obtener todos los elementos con la clase "decrement"
const decrementButtons = document.querySelectorAll(".decrement");

// Agregar event listener a los botones de incremento
incrementButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    console.log(button);
    const productId = button.dataset.productId;

    console.log(productId);
    const quantityElement = button.parentElement.querySelector("#quantity");
    let quantity = parseInt(quantityElement.textContent);
    quantity++;

    quantityElement.textContent = quantity;

    try {
      const response = await fetch(
        `/api/carts/${pCartId}/products/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity: quantity }),
        }
      );

      const result = await response.json();

      if (result.status === "success") {
        Swal.fire({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          title: `Cantidad modificada!`,
          icon: "success",
        });
      }
    } catch (error) {
      console.log("Error:", error);
    }
  });
});

// Agregar event listener a los botones de decremento
decrementButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const productId = button.dataset.productId;
    const cartId = button.dataset.cartId;
    const quantityElement = button.parentElement.querySelector("#quantity");
    let quantity = parseInt(quantityElement.textContent);

    if (quantity > 0) {
      quantity--;

      quantityElement.textContent = quantity;

      try {
        const response = await fetch(
          `/api/carts/${pCartId}/products/${productId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity: quantity }),
          }
        );
        const result = await response.json();

        if (result.status === "success") {
          Swal.fire({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            title: `Cantidad modificada!`,
            icon: "success",
          });
        }
      } catch (error) {
        console.log("Error:", error);
      }
    }
  });
});

// Obtener todos los elementos con la clase "remove"
const removeButtons = document.querySelectorAll(".remove");

// Agregar event listener a los botones de eliminar
removeButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const productId = button.dataset.productId;
    const productElement = button.closest("#cardCart");
    productElement.remove();

    try {
      const response = await fetch(
        `/api/carts/${pCartId}/products/${productId}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (result.status === "success") {
        Swal.fire({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          title: `Producto eliminado!`,
          icon: "success",
        });
      }
    } catch (error) {
      console.log("Error:", error);
    }
  });
});
