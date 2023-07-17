const finalizarCompraBtn = document.getElementById("finalizarCompraBtn");
const userName = document.querySelector(".userName").dataset.userId;
const montoTotal = document.querySelector(".montoTotal").dataset.total;
const userCart = document.querySelector(".cart").dataset.cartId;

// -Función para crear el ticket
const createTicket = async () => {
  try {
    if (!userName || montoTotal === "0" || !userCart) {
      throw new Error(
        "Faltan datos requeridos o el monto total es cero para crear el ticket"
      );
    }
    // Realiza una petición al servidor para crear el ticket
    const response = await fetch("/api/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: montoTotal,
        purchaser: userName,
        cart: userCart,
      }),
    });

    // Verifica si la petición fue exitosa
    if (response.ok) {
      const ticketData = await response.json();

      // Muestra una notificación de éxito con el ID del ticket creado
      Swal.fire({
        icon: "success",
        title: "Compra finalizada",
        text: `Se ha creado el ticket con el ID:${ticketData.payload._id} `,
      });
      window.location.replace("/thanks");
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
