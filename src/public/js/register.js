const form = document.getElementById("registerForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));
  const response = await fetch("/api/sessions/register", {
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
      title: `Registro completo!`,
      icon: "success",
    });
    window.location.replace("/login");
  } else {
    Swal.fire({
      toast: false,
      position: "center",
      showConfirmButton: false,
      timer: 4000,
      title: `ERROR`,
      text: "algo salio mal en el registro verifica que el email contenga @ y . y el password mas de 6 caracteres",
      icon: "error",
    });
  }
});
