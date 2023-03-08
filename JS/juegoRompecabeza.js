//obtener parametro
let paramURL = window.location.search;
let parametrosURL = new URLSearchParams(paramURL);
let juegoID = parametrosURL.get('idJuego');

let usuario = JSON.parse(localStorage.getItem("usuario"))

const inicio = document.getElementById("inicio");
const playBtn = document.getElementById("play-btn");
const imageSelection = document.getElementById("image-selection");
const difficultySelection = document.getElementById("difficulty-selection");

const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const img3 = document.getElementById("img3");

const pieces16Btn = document.getElementById("16-pieces-btn");
const pieces32Btn = document.getElementById("32-pieces-btn");
const pieces64Btn = document.getElementById("64-pieces-btn");

const boton = document.getElementById("miboton");
const boton2 = document.getElementById("miboton2");

const boton3 = document.getElementById("reiniciar1");
const boton4 = document.getElementById("reiniciar2");
const boton5 = document.getElementById("reiniciar3");

const resultado1 = document.getElementById("result1");
const resultado2 = document.getElementById("result2");
const resultado3 = document.getElementById("result3");

const volver1 = document.getElementById("volver1");
const volver2 = document.getElementById("volver2");
const volver3 = document.getElementById("volver3");


/* BOTON VOLVER */
volver1.addEventListener("click", function() {
  document.getElementById("rompecabeza1").classList.toggle("hidden");
  imageSelection.classList.remove("hidden");
});
volver2.addEventListener("click", function() {
  document.getElementById("rompecabeza2").classList.toggle("hidden");
  imageSelection.classList.remove("hidden");
});
volver3.addEventListener("click", function() {
  document.getElementById("rompecabeza3").classList.toggle("hidden");
  imageSelection.classList.remove("hidden");
});
/* */

/* BOTON JUGAR */
playBtn.addEventListener("click", function() {
  document.getElementById("inicio").classList.toggle("hidden");
  imageSelection.classList.remove("hidden");
});

/* BOTON REINICIAR 1*/
boton3.addEventListener("click", function() {
  document.getElementById("rompecabeza1").classList.toggle("hidden");
  document.getElementById("result1").classList.toggle("hidden");

  imageSelection.classList.remove("hidden");
});
/* BOTON REINICIAR 2 */
boton4.addEventListener("click", function() {
  document.getElementById("rompecabeza2").classList.toggle("hidden");
  document.getElementById("result2").classList.toggle("hidden");

  imageSelection.classList.remove("hidden");
});

/* BOTON REINICIAR 3 */
boton5.addEventListener("click", function() {
  document.getElementById("rompecabeza3").classList.toggle("hidden");
  document.getElementById("result3").classList.toggle("hidden");

  imageSelection.classList.remove("hidden");
});

/* ROMPECABEZA 01*/
const rompecabeza1 = document.getElementById("rompecabeza1");
var piezas = document.getElementsByClassName('movil');
var elementSelect = 0;
var currentX = 0;
var currentY = 0;
var currentPosX = 0;
var currentPosY = 0;
var tamWidh = [133.3, 133.3, 133.3, 133.3, 133.3, 133.3, 133.3, 133.3, 133.3];
var tamHeight = [133.3, 133.3, 133.3, 133.3, 133.3, 133.3, 133.3, 133.3, 133.3];
var entorno = document.getElementById('entorno');
var origX = [350, 483.3, 616.6, 350, 483.3, 616.6, 350, 483.3, 616.6];
var origY = [10, 10, 10, 143.3, 143.3, 143.3, 276.6, 276.6, 276.6];

/* ROMPECABEZA 02*/
const rompecabeza2 = document.getElementById("rompecabeza2");
var piezas2 = document.getElementsByClassName('movil2');

var tamWidh2 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
var tamHeight2 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];

var elementSelect2 = 0;
var currentX2 = 0;
var currentY2 = 0;
var currentPosX2 = 0;
var currentPosY2 = 0;

var entorno2 = document.getElementById('entorno2');
var origX2 = [398, 498, 598, 398, 498, 598, 398, 498, 598, 398, 498, 598];
var origY2 = [10, 10, 10, 110, 110, 110, 210, 210, 210, 310, 310, 310];

/* ROMPECABEZA 03*/
const rompecabeza3 = document.getElementById("rompecabeza3");
var piezas3 = document.getElementsByClassName('movil3');

var tamWidh3 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
var tamHeight3 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];

var elementSelect3 = 0;
var currentX3 = 0;
var currentY3 = 0;
var currentPosX3 = 0;
var currentPosY3 = 0;

var entorno3 = document.getElementById('entorno3');
var origX3 = [350, 450, 550, 650, 350, 450, 550, 650, 350, 450, 550, 650, 350, 450, 550, 650];
var origY3 = [10, 10, 10, 10, 110, 110, 110, 110, 210, 210, 210, 210, 310, 310, 310, 310];

img1.addEventListener("click", rompe1_8);
img2.addEventListener("click", rompe2_12);
img3.addEventListener("click", rompe3_16);

/* 9 PIEZAS */
function rompe1_8() {
  document.getElementById("image-selection").classList.toggle("hidden");
  rompecabeza1.classList.remove("hidden");

  for (var i = 0; i < piezas.length; i++) {
    piezas[i].setAttribute("width", tamWidh[i]);
    piezas[i].setAttribute("height", tamHeight[i]);
    piezas[i].setAttribute("x", Math.floor((Math.random() * 10) + 1));
    piezas[i].setAttribute("y", Math.floor((Math.random() * 309) + 1));
    piezas[i].setAttribute("onmousedown", "seleccionarElemento(evt)");
  }
}

function seleccionarElemento(evt) {
  elementSelect = reordenar(evt);
  currentX = evt.clientX;
  currentY = evt.clientY;
  currentPosx = parseFloat(elementSelect.getAttribute("x"));
  currentPosy = parseFloat(elementSelect.getAttribute("y"));
  elementSelect.setAttribute("onmousemove", "moverElemento(evt)");
}

function moverElemento(evt) {
  var dx = evt.clientX - currentX;
  var dy = evt.clientY - currentY;
  currentPosx = currentPosx + dx;
  currentPosy = currentPosy + dy;
  elementSelect.setAttribute("x", currentPosx);
  elementSelect.setAttribute("y", currentPosy);
  currentX = evt.clientX;
  currentY = evt.clientY;
  elementSelect.setAttribute("onmouseout", "deseleccionarElemento(evt)");
  elementSelect.setAttribute("onmouseup", "deseleccionarElemento(evt)");
  iman();
}

function deseleccionarElemento(evt) {
  testing();
  if (elementSelect != 0) {
    elementSelect.removeAttribute("onmousemove");
    elementSelect.removeAttribute("onmouseout");
    elementSelect.removeAttribute("onmouseup");
    elementSelect = 0;
  }
}

function reordenar(evt) {
  var padre = evt.target.parentNode;
  var clone = padre.cloneNode(true);
  var id = padre.getAttribute("id");
  entorno.removeChild(document.getElementById(id));
  entorno.appendChild(clone);
  return entorno.lastChild.firstChild;
}

function iman() {
  for (var i = 0; i < piezas.length; i++) {
    if (Math.abs(currentPosx - origX[i]) < 15 && Math.abs(currentPosy - origY[i]) < 15) {
      elementSelect.setAttribute("x", origX[i]);
      elementSelect.setAttribute("y", origY[i]);
    }
  }
}

function showResult() {
  resultado1.classList.remove("hidden");

}

function testing() {
  var bien_ubicada = 0;
  var padres = document.getElementsByClassName('padre');
  for (var i = 0; i < piezas.length; i++) {
    var posx = parseFloat(padres[i].firstChild.getAttribute("x"));
    var posy = parseFloat(padres[i].firstChild.getAttribute("y"));
    ide = padres[i].getAttribute("id");
    if (origX[ide] == posx && origY[ide] == posy) {
      bien_ubicada = bien_ubicada + 1;
    }
  }
  if (bien_ubicada == 9) {
    showResult();
    if (usuario != null) {
      fetch(`https://brainplayapi20230304144140.azurewebsites.net/api/Juego/MarcarCompletado?idUsuario=${usuario.value.id}&idJuego=${juegoID}`)
    }
  }
}


/* 12 PIEZAS */
function rompe2_12() {
  document.getElementById("image-selection").classList.toggle("hidden");
  rompecabeza2.classList.remove("hidden");

  for (var i = 0; i < piezas2.length; i++) {
    piezas2[i].setAttribute("width", tamWidh2[i]);
    piezas2[i].setAttribute("height", tamHeight2[i]);
    piezas2[i].setAttribute("x", Math.floor((Math.random() * 10) + 1));
    piezas2[i].setAttribute("y", Math.floor((Math.random() * 309) + 1));
    piezas2[i].setAttribute("onmousedown", "seleccionarElemento2(evt)");
  }
}
/*function reordenar(evt){
  var padre = evt.target.parentNode;
  var clone = padre.cloneNode(true);
  var id = padre.getAttribute("id");
  entorno.removeChild(document.getElementById(id));
  entorno.appendChild(clone);
  return entorno.lastChild.firstChild;
}*/

function seleccionarElemento2(evt) {
  elementSelect2 = evt.target;/*reordenar2(evt);*/
  currentX2 = evt.clientX;
  currentY2 = evt.clientY;
  currentPosx2 = parseFloat(elementSelect2.getAttribute("x"));
  currentPosy2 = parseFloat(elementSelect2.getAttribute("y"));
  elementSelect2.setAttribute("onmousemove", "moverElemento2(evt)");
}

function moverElemento2(evt) {
  var dx = evt.clientX - currentX2;
  var dy = evt.clientY - currentY2;
  currentPosx2 = currentPosx2 + dx;
  currentPosy2 = currentPosy2 + dy;
  elementSelect2.setAttribute("x", currentPosx2);
  elementSelect2.setAttribute("y", currentPosy2);
  currentX2 = evt.clientX;
  currentY2 = evt.clientY;
  elementSelect2.setAttribute("onmouseout", "deseleccionarElemento2(evt)");
  elementSelect2.setAttribute("onmouseup", "deseleccionarElemento2(evt)");
  iman2();
}

function deseleccionarElemento2(evt) {
  testing2();
  if (elementSelect2 != 0) {
    elementSelect2.removeAttribute("onmousemove");
    elementSelect2.removeAttribute("onmouseout");
    elementSelect2.removeAttribute("onmouseup");
    elementSelect2 = 0;
  }
}

function showResult2() {
  resultado2.classList.remove("hidden");
}

function testing2() {
  var bien_ubicada = 0;
  var padres = document.getElementsByClassName('padre2');
  for (var i = 0; i < piezas2.length; i++) {
    var posx2 = parseFloat(padres[i].firstChild.getAttribute("x"));
    var posy2 = parseFloat(padres[i].firstChild.getAttribute("y"));
    ide = padres[i].getAttribute("id");
    if (origX2[ide] == posx2 && origY2[ide] == posy2) {
      bien_ubicada = bien_ubicada + 1;
    }
  }
  if (bien_ubicada == 12) {
    showResult2();
    if (usuario != null) {
      fetch(`https://brainplayapi20230304144140.azurewebsites.net/api/Juego/MarcarCompletado?idUsuario=${usuario.value.id}&idJuego=${juegoID}`)
    }
  }
}

function iman2() {
  for (var i = 0; i < piezas2.length; i++) {
    if (Math.abs(currentPosx2 - origX2[i]) < 15 && Math.abs(currentPosy2 - origY2[i]) < 15) {
      elementSelect2.setAttribute("x", origX2[i]);
      elementSelect2.setAttribute("y", origY2[i]);
    }
  }
}

/*function reordenar2(evt){
  var padre = evt.target.parentNode;
  var clone = padre.cloneNode(true);
  var id = padre.getAttribute("id");
  entorno2.removeChild(document.getElementById(id));
  entorno2.appendChild(clone);
  return entorno2.lastChild.firstChild;
}*/

/*25 PIEZAS*/
boton.addEventListener("click", function() {
  document.getElementById("image-selection").classList.toggle("hidden");
  inicio.classList.remove("hidden");
});

boton2.addEventListener("click", function() {
  document.getElementById("difficulty-selection").classList.toggle("hidden");
  imageSelection.classList.remove("hidden");
});


function rompe3_16() {
  document.getElementById("image-selection").classList.toggle("hidden");
  rompecabeza3.classList.remove("hidden");

  for (var i = 0; i < piezas3.length; i++) {
    piezas3[i].setAttribute("width", tamWidh3[i]);
    piezas3[i].setAttribute("height", tamHeight3[i]);
    piezas3[i].setAttribute("x", Math.floor((Math.random() * 10) + 1));
    piezas3[i].setAttribute("y", Math.floor((Math.random() * 309) + 1));
    piezas3[i].setAttribute("onmousedown", "seleccionarElemento3(evt)");
  }
}

function seleccionarElemento3(evt) {
  elementSelect3 = evt.target;/*reordenar2(evt);*/
  currentX3 = evt.clientX;
  currentY3 = evt.clientY;
  currentPosx3 = parseFloat(elementSelect3.getAttribute("x"));
  currentPosy3 = parseFloat(elementSelect3.getAttribute("y"));
  elementSelect3.setAttribute("onmousemove", "moverElemento3(evt)");
}

function moverElemento3(evt) {
  var dx = evt.clientX - currentX3;
  var dy = evt.clientY - currentY3;
  currentPosx3 = currentPosx3 + dx;
  currentPosy3 = currentPosy3 + dy;
  elementSelect3.setAttribute("x", currentPosx3);
  elementSelect3.setAttribute("y", currentPosy3);
  currentX3 = evt.clientX;
  currentY3 = evt.clientY;
  elementSelect3.setAttribute("onmouseout", "deseleccionarElemento3(evt)");
  elementSelect3.setAttribute("onmouseup", "deseleccionarElemento3(evt)");
  iman3();
}

function deseleccionarElemento3(evt) {
  testing3();
  if (elementSelect3 != 0) {
    elementSelect3.removeAttribute("onmousemove");
    elementSelect3.removeAttribute("onmouseout");
    elementSelect3.removeAttribute("onmouseup");
    elementSelect3 = 0;
  }
}
function showResult3() {
  resultado3.classList.remove("hidden");
}

function testing3() {
  var bien_ubicada = 0;
  var padres = document.getElementsByClassName('padre3');
  for (var i = 0; i < piezas3.length; i++) {
    var posx3 = parseFloat(padres[i].firstChild.getAttribute("x"));
    var posy3 = parseFloat(padres[i].firstChild.getAttribute("y"));
    ide = padres[i].getAttribute("id");
    if (origX3[ide] == posx3 && origY3[ide] == posy3) {
      bien_ubicada = bien_ubicada + 1;
    }
  }
  if (bien_ubicada == 16) {
    showResult3();
    if (usuario != null) {
      fetch(`https://brainplayapi20230304144140.azurewebsites.net/api/Juego/MarcarCompletado?idUsuario=${usuario.value.id}&idJuego=${juegoID}`)
    }
  }
}

function iman3() {
  for (var i = 0; i < piezas3.length; i++) {
    if (Math.abs(currentPosx3 - origX3[i]) < 20 && Math.abs(currentPosy3 - origY3[i]) < 20) {
      elementSelect3.setAttribute("x", origX3[i]);
      elementSelect3.setAttribute("y", origY3[i]);
    }
  }
}




