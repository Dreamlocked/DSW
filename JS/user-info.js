

//JSON.parse(localStorage.getItem("usuario")).value!=null
function onLoad() {
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
      window.location.replace("../index.html");
    })   
  } else {
    document.querySelector(".botones").style.display = "flex";
    document.querySelector(".user-info").style.display = "none";
  }
}
