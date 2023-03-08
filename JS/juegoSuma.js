//obtener parametro
let paramURL = window.location.search;
let parametrosURL = new URLSearchParams(paramURL);
let juegoID = parametrosURL.get('idJuego');

let usuario=JSON.parse(localStorage.getItem("usuario"))

let num1, num2, respuesta;
let txt_suma = document.getElementById("suma");
let op1 = document.getElementById("op1");
let op2 = document.getElementById("op2");
let op3 = document.getElementById("op3");
let txt_msj = document.getElementById("msj");
let txt_resultado = document.getElementById("resultado");
let cantidadCorrecta = 0; // variable para llevar la cuenta de respuestas correctas

function comenzar() {
  document.getElementById("coment").innerText="Responde correctamente 5 sumas, para ganar  🥳";
  document.getElementById("reiniciar").style.display="none";
  document.getElementById("regresar").style.display="none";
  txt_resultado.innerHTML = "?";
  txt_msj.innerHTML = "";

  //genera la suma - Numeros aleatorios entre 0 1 9
  num1 = Math.round(Math.random() * 9);
  num2 = Math.round(Math.random() * 9);
  respuesta = num1 + num2;
  //asignamos lo números para que se muestren
  suma.innerHTML = num1 + " + " + num2 + " = ";

  //genero un número entre 0 y 2 para colocar la opcion correcta
  indiceOpCorrecta = Math.round(Math.random() * 2);
  console.log(indiceOpCorrecta);

  //si indiceCorrrecta es igual 0
  if (indiceOpCorrecta == 0) {
    op1.innerHTML = respuesta;
    op2.innerHTML = respuesta + 1;
    op3.innerHTML = respuesta - 1;
  }
  if (indiceOpCorrecta == 1) {
    op1.innerHTML = respuesta - 1;
    op2.innerHTML = respuesta;
    op3.innerHTML = respuesta - 2;
  }
  if (indiceOpCorrecta == 2) {
    op1.innerHTML = respuesta + 2;
    op2.innerHTML = respuesta + 3;
    op3.innerHTML = respuesta;
  }
}

function controlarRespuesta(opcionElegida) {
  txt_resultado.innerHTML = opcionElegida.innerHTML;
  if (respuesta == opcionElegida.innerHTML) {
    cantidadCorrecta++; // aumenta el contador de respuestas correctas
    if (cantidadCorrecta >= 5) { // verifica si el usuario ha respondido correctamente 5 veces seguidas
      txt_msj.innerHTML = "GANASTE!";
      txt_msj.style.color = "green";
      cantidadCorrecta = 0; // reinicia el contador de respuestas correctas
      document.getElementById("coment").innerText="Felicidades 🥳 🥳 🥳 🥳";
      document.getElementById("reiniciar").style.display="inline-block";
      document.getElementById("regresar").style.display="inline-block";
      if(usuario!=null){
          fetch(`https://brainplayapi20230304144140.azurewebsites.net/api/Juego/MarcarCompletado?idUsuario=${usuario.value.id}&idJuego=${juegoID}`)
      }
    } else {
      txt_msj.innerHTML = "EXCELENTE!!";
      txt_msj.style.color = "green";
      setTimeout(comenzar, 2000);
    }
  } else {
    //cantidadCorrecta = 0; // reinicia el contador de respuestas correctas
    txt_msj.innerHTML = "INTENTA DE NUEVO!!";
    txt_msj.style.color = "red";
    setTimeout(limpiar, 2000);
  }
}

function limpiar() {
  txt_resultado.innerHTML = "?";
  txt_msj.innerHTML = "";
}
function regresar(){
  window.location.replace("../juegos.html");
}
comenzar();







