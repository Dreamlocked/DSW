let usuarioRecuperado = JSON.parse(localStorage.getItem('usuario'));
let token = usuarioRecuperado.value.token;
let id = usuarioRecuperado.value.id;
GetDatos();

function GetDatos() {
  let nombre;
  let apellido;
  let cumple;
  let correo;
  let imagen;
  let puntaje;

  window.onload = async () => {
    if (usuarioRecuperado) {
      document.querySelector(".botones").style.display = "none";
      document.querySelector(".user-info").style.display = "flex";
      document.getElementById("nombre-usuario").textContent=usuarioRecuperado.value.userName;
      document.getElementById('cerrar').addEventListener('click', (e) => {
        e.preventDefault()
        localStorage.removeItem("usuario");
        if(JSON.parse(localStorage.getItem("data"))){
          localStorage.removeItem("data");
        }
        window.location.replace("../index.html");
      })   
    } else {
      document.querySelector(".botones").style.display = "flex";
      document.querySelector(".user-info").style.display = "none";
    }
    nombre = document.getElementById('Nombres');
    apellido = document.getElementById('Apellidos');
    cumple = document.getElementById('Cumpleaños');
    correo = document.getElementById('Correo');
    puntaje = document.getElementById('Puntaje')
    imagen = document.getElementById('imagen-perfil');
  
    await obtenerUsuario(id,token).then(data => {
      nombre.value = data.nombre;
      apellido.value = data.apellido;
      cumple.value = data.fechanac;
      correo.value = data.correo;
      puntaje.value = data.puntaje;
      imagen.innerHTML = `<img class="foto_perfil" src="${data.urlimage}" alt="foto perfil">`;
    })   
  };



  // n representa el id del usuario; tok, token.
  async function obtenerUsuario(n,tok) {
    data = await fetch(`https://brainplayapi20230304144140.azurewebsites.net/api/Usuario/ObtenerUsuario?idUsuario=${n}`,{
      method:'GET',
      headers:{
        'Authorization': `Bearer ${tok}`
      }
    })
      .then(response => response.json())
      .then(data => data.value)
      console.log(data)
      let usuarioTemp = JSON.stringify(data);
      localStorage.setItem("data",usuarioTemp);
      Trofeos();
    return data;
  }
}
