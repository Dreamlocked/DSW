
window.onload = async()=>{
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
  const cuento= obtenerListaCuentos().then(data=>{
      document.getElementById("cuento1").src=`${data[0].urlimage}`;
      document.getElementById("cuento2").src=`${data[1].urlimage}`;
  })
  const juego= obtenerListaJuegos(1).then(data=>{
      document.getElementById("juego1").src=`${data[0].urlfoto}`;
      document.getElementById("juego2").src=`${data[1].urlfoto}`;
  })
  await Promise.all([cuento, juego]);
}


async function obtenerListaCuentos(){
    data= await fetch(`https://brainplayapi20230304144140.azurewebsites.net/api/Cuento/Lista`)
    .then(response =>response.json())
    .then(data => data.value);
    return data;
}

async function obtenerListaJuegos(){
    data= await fetch(`https://brainplayapi20230304144140.azurewebsites.net/api/Juego/Lista`)
    .then(response =>response.json())
    .then(data => data.value);
    return data;
}