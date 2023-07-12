// Función para crear el ticket
const createTicket = async () => {
  try {
    // Realiza una petición al servidor para crear el ticket
    const response = await fetch("/api/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Agrega los datos necesarios para crear el ticket (por ejemplo, el código, el monto y el comprador)
        code: "...",
        amount: "...",
        purchaser: "...",
      }),
    });
    console.log(response);
    // Verifica si la petición fue exitosa
    if (response.ok) {
      const data = await response.json();

      // Muestra una notificación de éxito con el ID del ticket creado
      Swal.fire({
        icon: "success",
        title: "Compra finalizada",
        text: `Se ha creado el ticket con el ID: ${data.ticket._id}`,
      });
    } else {
      throw new Error("Error al crear el ticket");
    }
  } catch (error) {
    // Muestra una notificación de error si ocurre algún problema
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Ha ocurrido un error al finalizar la compra",
    });
  }
};

// Agrega un evento de clic al botón "Finalizar compra"
const finalizarCompraBtn = document.getElementById("finalizarCompraBtn");
finalizarCompraBtn.addEventListener("click", createTicket);
