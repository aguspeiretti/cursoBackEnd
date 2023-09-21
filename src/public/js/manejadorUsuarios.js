// Obtener todos los elementos con la clase "remove"
const removeButtons = document.querySelectorAll(".bottonEliminarUsuario");
const updateButton = document.querySelectorAll(".bottonModificarUsuario");

// Agregar event listener a los botones de eliminar
removeButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const userId = button.dataset.userId;
    console.log(userId);
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.status === "success") {
        Swal.fire({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
          title: `Usuario Eliminado!`,
          icon: "success",
        });
      }
    } catch (error) {
      console.log("Error:", error);
    }
  });
});

updateButton.forEach((button) => {
  button.addEventListener("click", async () => {
    const userId = button.dataset.userId;
    const selectElement = document.getElementById(`select_${userId}`);
    const selectedValue = selectElement.value;

    await fetch(`/api/users/${userId}/premium`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ selectedValue }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === "success") {
          Swal.fire({
            toast: false,
            position: "center",
            showConfirmButton: false,
            timer: 3000,
            title: `Cambiaste tu role! a ${JSON.stringify(selectedValue)}
                `,
            icon: "success",
          });
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  });
});
