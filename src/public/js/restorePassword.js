const form = document.getElementById("restorePasswordForm");

const urlParams = new Proxy(new URLSearchParams(window.location.search), {
  get: (serchParams, prop) => serchParams.get(prop),
});
console.log(urlParams.token);

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));
  obj.token = urlParams.token;
  const response = await fetch("/api/sessions/restorePassword", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseData = await response.json();

  if (responseData.status === "success") {
    Swal.fire({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      title: `Cambiaste tu pass!`,
      icon: "success",
    });
  } else {
    Swal.fire({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      title: `El password es el mismo que tenias`,
      icon: "error",
    });
  }
});
