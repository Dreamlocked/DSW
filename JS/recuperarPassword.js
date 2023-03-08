const form = document.getElementById('form-recuperar');
const url = 'https://brainplayapi20230304144140.azurewebsites.net/api/Usuario/ReestablecerClave';

form.addEventListener('submit', function (event) {
  event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
  console.log("LLega aca")
  const info = new FormData(form);
  const jsonInfo = {};

  for (const [key, value] of info.entries()) {
    jsonInfo[key] = value;
  }

  const correo = jsonInfo["correo"];

  const options = {
    method: 'POST',
    body: JSON.stringify(correo),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  fetch(url, options)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if (data.value === true) {
        swal({
          title: 'Contraseña enviada',
          icon: 'success'
        }).then(() => {
          // redirecciona a la página de registro
          window.location.href = './Ingresar.html';
        });
      } else {
        throw new Error('Error en la solicitud');
      }
    })
    .catch(error => {
      swal({
        title: 'Error',
        text: 'El correo ingresado es incorrecto',
        icon: 'error'
      });
    });
});
