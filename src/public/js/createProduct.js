const form = document.getElementById("productForm");
const botonEliminar = document.getElementsByClassName("bottonEliminar");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));
  const response = await fetch("/api/products/", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "content-type": "application/json",
    },
  });
  const resposeData = await response.json();

  if (resposeData.status === "success") {
    Swal.fire({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      title: `producto Creado!!`,
      icon: "success",
    });
  }
});

// Obtener todos los elementos con la clase "remove"
const removeButtons = document.querySelectorAll(".bottonEliminar");

// Agregar event listener a los botones de eliminar
removeButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const productId = button.dataset.productId;

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.status === "success") {
        Swal.fire({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
          title: `Producto eliminado!`,
          icon: "success",
        });
      }
    } catch (error) {
      console.log("Error:", error);
    }
  });
});
