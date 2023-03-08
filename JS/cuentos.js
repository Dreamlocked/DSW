let id='';

window.onload = async () => {
  let usuario=JSON.parse(localStorage.getItem("usuario"))
  if (usuario) {
    document.querySelector(".botones").style.display = "none";
    document.querySelector(".user-info").style.display = "flex";
    document.getElementById("nombre-usuario").textContent=usuario.value.userName;
    document.getElementById('cerrar').addEventListener('click', (e) => {
      e.preventDefault()
      localStorage.removeItem("usuario");
      if(JSON.parse(localStorage.getItem("data"))){
        localStorage.removeItem("data");
      }
      window.location.replace("./index.html");
    })
  } else {
    document.querySelector(".botones").style.display = "flex";
    document.querySelector(".user-info").style.display = "none";
  }
  
  await obtenerListaCuentos().then(data => {
    for (let i = 0; i < data.length / 2; i++) {

      document.getElementById("fila1").innerHTML += `
                <br>
                  <div class="col">
                  <a  href="cuentoID.html?idCuento=${data[i].id}" ><img src="${data[i].urlimage}" class="img-thumbnail" alt="Imagen Responsiva"></a>
                  <a  class="titulazo" href="cuentoID.html?idCuento=${data[i].id}" ><h5 class="nombretitulazo" id="cuentoTitulo">${data[i].titulo}</h5></a>
                  </div>
                  <br>`
        ;
    }
    for (let i = data.length / 2; i < data.length; i++) {

      document.getElementById("fila2").innerHTML += `
                      <br>
                      <div class="col">
                      <a  href="cuentoID.html?idCuento=${data[i].id}" > <img src="${data[i].urlimage}" class="img-thumbnail" alt="Imagen Responsiva"></a>
                      <a  class="titulazo" href="cuentoID.html?idCuento=${data[i].id}" > <h5 class="nombretitulazo" id="cuentoTitulo">${data[i].titulo}</h5></a>
                      </div>
                      <br>`
        ;
    }
  })
}

async function obtenerListaCuentos() {
  data = await fetch(`https://brainplayapi20230304144140.azurewebsites.net/api/Cuento/Lista${id}`)
    .then(response => response.json())
    .then(data => data.value);
  return data;
}

