//document.write('texto');
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

  await obtenerPreguntas().then(data => {
    let envio = document.getElementById('envoltura');
    console.log(data)
    for (let i = 0; i < data.length; i++) {
      let uniq = data[i];
      envio.innerHTML +=
        `<div class="gb-container">
                <div class="gb-container gb-container-ee832e5e rocket-lazyload entered lazyloaded" style="background-image: url(${uniq.urlfoto})" data-ll-status="loaded">
                    <a class="gb-container-link" href="./Juegos/juego_${uniq.id}.html?idJuego=${uniq.id}"></a>
                    <div class="gb-inside-container">
                    <h2 class="gb-headline gb-headline-d87fbabf gb-headline-text">
                        <a href="./Juegos/juego_${uniq.id}.html?idJuego=${uniq.id}"> ${uniq.titulo} </a>
                    </h2>
                    </div>
                </div>
            </div>`
    }
  })
};

async function obtenerPreguntas() {
  data = await fetch(`https://brainplayapi20230304144140.azurewebsites.net/api/Juego/Lista${id}`)
    .then(response => response.json())
    .then(data => data.value)
  return data;
}