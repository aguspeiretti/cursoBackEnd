const finalizarCompraBtn = document.getElementById("finalizarCompraBtn");
const userName = document.querySelector(".userName").dataset.userId;
const montoTotal = document.querySelector(".montoTotal").dataset.total;

// -Función para crear el ticket
const createTicket = async () => {
  try {
    // Realiza una petición al servidor para crear el ticket
    const response = await fetch("/api/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: montoTotal,
        purchaser: userName,
      }),
    });

    // Verifica si la petición fue exitosa
    if (response.ok) {
      const ticketData = await response.json();
      console.log(ticketData.payload);
      // Muestra una notificación de éxito con el ID del ticket creado
      Swal.fire({
        icon: "success",
        title: "Compra finalizada",
        text: `Se ha creado el ticket con el ID:${ticketData.payload._id} `,
      });
    } else {
      throw new Error("Error al crear el ticket");
    }
  } catch (error) {
    console.log(error);
    // Muestra una notificación de error si ocurre algún problema
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Ha ocurrido un error al finalizar la compra",
    });
  }
};

// Agrega un evento de clic al botón "Finalizar compra"

finalizarCompraBtn.addEventListener("click", createTicket);
