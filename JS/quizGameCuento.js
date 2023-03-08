//obtener parametro
let paramURL = window.location.search;
let parametrosURL = new URLSearchParams(paramURL);
let cuentitoID = parametrosURL.get('idCuento');

let usuario=JSON.parse(localStorage.getItem("usuario"))
//Arreglo con las preguntas
let preguntas = [];

//Arreglo que guarda la opcion correcta
let correcta=[];
//Titulo del cuento
let titulo="";
//Arreglo que guarda las opciones de cada pregunta
let opciones =[]

//Variable guarda la posicion actual
let posActual =0;
//Variable que guarda las preguntas acertadas
let cantidadAcertadas=0;
//Funcion para cargar la siguiente pregunta y sus opcioness
window.onload=async ()=>{
    await obtenerPreguntas(cuentitoID).then(data=>{
        titulo=data.titulo;
        for(let i=0;i<data.pregunta.length;i++){
            preguntas.push(data.pregunta[i].descripcion)
        }
        let arrayprimario=[];
        let primerNumero;
        let valorCorrecto;
        for(let i=0;i<data.pregunta.length;i++){
            for(let j=0;j<data.pregunta[i].alternativas.length;j++){
                arrayprimario.push(data.pregunta[i].alternativas[j].descripcion);
                if(data.pregunta[i].alternativas[j].correcta==true){
                    primerNumero=data.pregunta[i].alternativas[0].id;
                    valorCorrecto=data.pregunta[i].alternativas[j].id;
                }
            }
            correcta.push(valorCorrecto-primerNumero);
            opciones.push(arrayprimario);
            arrayprimario=[];
        }  
    })
    cargarPreguntas()
};

async function obtenerPreguntas(n){
    data=await fetch(`https://brainplayapi20230304144140.azurewebsites.net/api/Cuento?idCuento=${n}`)
        .then(response =>response.json())
        .then(data=>data.value)
    return data;
}
function cargarPreguntas(){
    //Controla si no hay mas preguntas
    if(preguntas.length<=posActual){
        terminarJuego();
    }else{
        limpiarOpciones();
        document.getElementById("preguntaCuento").innerHTML=preguntas[posActual];
        document.getElementById("titulo-cuento").innerHTML=titulo;
        document.getElementById("n0").innerHTML=opciones[posActual][0];
        document.getElementById("n1").innerHTML=opciones[posActual][1];
        document.getElementById("n2").innerHTML=opciones[posActual][2];
    }
}
const comprobarRespuesta=opcionElegida=>{
    if(opcionElegida==correcta[posActual]){ //Acerto la pregunta
        document.getElementById("n"+opcionElegida).className="nombre nombreAcertada";
        document.getElementById("l"+opcionElegida).className="letra letraAcertada";
        cantidadAcertadas++;
    }else{ //No acerto
        //Limpiar clases
        document.getElementById("n"+opcionElegida).className="nombre nombreNoAcertada";
        document.getElementById("l"+opcionElegida).className="letra letraNoAcertada";

        document.getElementById("n"+correcta[posActual]).className="nombre nombreAcertada";
        document.getElementById("l"+correcta[posActual]).className="letra letraAcertada";
    }
    posActual++;
    setTimeout(cargarPreguntas,500);
}
const limpiarOpciones=()=>{
    document.getElementById("n0").className="nombre";
    document.getElementById("n1").className="nombre";
    document.getElementById("n2").className="nombre";

    document.getElementById("l0").className="letra";
    document.getElementById("l1").className="letra";
    document.getElementById("l2").className="letra";
}
const terminarJuego=()=>{
    document.getElementById("pantalla-juego").style.display="none";
    document.getElementById("pantalla-final").style.display="block";
    //Agrega los resultados
    document.getElementById("numCorrectas").innerHTML=cantidadAcertadas;
    document.getElementById("numIncorrectas").innerHTML=preguntas.length-cantidadAcertadas;
    if(cantidadAcertadas==preguntas.length){
        Swal.fire({
            title: 'Ganaste!!!!',
            text: 'Felicidades',
            imageUrl: 'https://unsplash.it/400/200',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
          })
        if(usuario!=null){
          fetch(`https://brainplayapi20230304144140.azurewebsites.net/api/Cuento/MarcarCompletado?idUsuario=${usuario.value.id}&idCuento=${cuentitoID}`)
        }
    }

}
const regresarCuento=()=>{
    window.location.replace(`./cuentoID.html?idCuento=${cuentitoID}`);
}
const recargarPagina=()=>{
    window.location.reload();
    posActual=0;
    cantidadAcertadas=0;
}