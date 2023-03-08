

const paramURL = window.location.search;
const parametrosURL = new URLSearchParams(paramURL);
const cuentitoID = parametrosURL.get('idCuento');


console.log(cuentitoID);

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
    await obtenerListaCuentos().then(data=>{
      
            document.getElementById("tituloDescripcion").innerHTML+= `
            ${data.titulo} - ${data.autor}
            `
            document.getElementById("descripcion").innerHTML+= `
            ${data.descripcion}
            `
            document.getElementById("hola").innerHTML+= `
                  <div class="col">
                  <h1 class="nombretitulazo">${data.titulo}</h1>
                  <br>
                  <img src="${data.urlimage}" class="img-thumbnail" alt="Imagen Responsiva">
                  </div>
                  `
                  
            document.getElementById("textazo").innerHTML+= `
                <div class="container text-center">
                <div class="col">
                  <iframe src="${data.urlfile}" width="90%" height="550" frameborder="1" align="center" scrolling="auto">
                  </iframe>
                  <br>
                </div>
                </div>`;

            document.getElementById("botones").innerHTML+= `
                <div class="button-container">
                    <div class="mr-2">
                        <a href="./quizGameCuentos.html?idCuento=${data.id}" class="btn btn-primary " >Tomar Quiz</a>
 
                    </div>
                </div>`
                  ;          

    })
}
//
async function obtenerListaCuentos(){
    data= await fetch(`https://brainplayapi20230304144140.azurewebsites.net/api/Cuento?idCuento=${cuentitoID}`)
    .then(response =>response.json())
    .then(data => data.value);
    return data;
}
