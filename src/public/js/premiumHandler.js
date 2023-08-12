// //agrego el producto al carrito

// const premiumButton = document.getElementsByClassName("premiumButton");
// Array.from(premiumButton).forEach((button) => {
//   button.addEventListener("click", async (event) => {
//     console.log("yo te hago premium");
//     fetch("/api/users/premium", {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }).catch((error) => {
//       console.log("Error:", error);
//     });
//   });
// });

const premiumHandler = async (type) => {
  console.log(type);
  const data = { type: type };
  fetch("/api/users/premium", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
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
          title: `Cambiaste tu role! a ${JSON.stringify(data.type)}
          Tu role cambiara la proxima vez que inicies session`,
          icon: "success",
        });
      }
    })
    .catch((error) => {
      console.log("Error:", error);
    });
};
