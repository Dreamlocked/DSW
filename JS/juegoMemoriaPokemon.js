//obtener parametro
let paramURL = window.location.search;
let parametrosURL = new URLSearchParams(paramURL);
let juegoID = parametrosURL.get('idJuego');

//Initilization of the variables
let uncoveredCard=0;
let card1=null;
let card2=null;
let firstResult=null;
let secondResult=null;
let movements=0;
let success=0;
let temporizador=false;
let time=60;
let timerInitial=60;
let tiempoRegresivoID=null;
let randomizar=true;

//Initilization of the variables for the Pokemons
let arrayFinal;
let pokeArray=[];
let array=[];
//Pointing to document HTML
let showMovements=document.getElementById('movements');
let showSuccess=document.getElementById('aciertos');
let showTime=document.getElementById('t-restante');
let button=document.getElementById('boton');
let usuario=null;
//Called functions
aleatorieNumbers();
savePokemons();

//Functions
function savePokemons(){
    usuario=JSON.parse(localStorage.getItem("usuario"))
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
    fetchPokemons().then(data=>{
        data.forEach(d=>{
            pokeArray.push(d);
        })
    });
}
function countTime(){
    tiempoRegresivoID=setInterval(() => {
        time--;
        showTime.innerHTML = `Tiempo: ${time} segundos`;
        if(time==0){
            clearInterval(tiempoRegresivoID);
            lockCard();
            button.style.display="inline-block";
            button.innerHTML='Volver a jugar';
        }
    }, 1000);
}
function lockCard(){
    for(let i=0;i<=15;i++){
        let lockCard=document.getElementById(i);
        fetchPokemons().then(data=>{
            lockCard.innerHTML=`<img src="${data[i]}" alt="pokemons">`;
        })
        lockCard.disabled=true;
    }
}
function aleatorieNumbers(){
    for(let i=0;i<8;i++){
        let nm=Math.ceil(Math.random()*1007)
        array.push(nm);
    }
}
async function fetchPokemons(){
    let arrayPrimary=[];
    for(let i=0;i<8;i++){
        arrayPrimary[i]=await fetch(`https://pokeapi.co/api/v2/pokemon/${array[i]}`)
            .then(response => response.json())
            .then(data=>data.sprites.front_default)
    }
    if(randomizar){
        arrayFinal=[...arrayPrimary,...arrayPrimary];
        arrayFinal=arrayFinal.sort(()=>{return Math.random()-0.5})
        randomizar=false;
    }
     return arrayFinal;
}
function unlockCard(){
    //Reiniciar los cards
    showSuccess.innerHTML=`Aciertos: 0`;
    showTime.innerHTML=`Tiempo: 60 segundos`;
    showMovements.innerHTML=`Movimientos: 0`;
    button.style.display="none";
    //Reiniciar las variables
    time=60;
    temporizador=false;
    movements=0;
    success=0;
    uncoveredCard=0;
    randomizar=true;
    pokeArray=[];
    array=[];
    aleatorieNumbers();
    for(let i=0;i<=15;i++){
        let lockCard=document.getElementById(i);
        lockCard.innerHTML=' ';
        lockCard.disabled=false;
    }
    savePokemons();
}
//Principal function
function destapar(id){
    if(temporizador==false){
        countTime();
        temporizador=true;
    }
    uncoveredCard++;
    if(uncoveredCard==1){
        //Show the first number
        card1=document.getElementById(id);
        firstResult=pokeArray[id];
        card1.innerHTML=`<img src="${firstResult}" alt="pokemons">`

        //Disable the first button
        card1.disabled=true;
    }else if(uncoveredCard==2){
        //Show the second number
        card2=document.getElementById(id);
        secondResult=pokeArray[id];
        card2.innerHTML=`<img src="${secondResult}" alt="pokemons">`

        //Disable the second button
        card2.disabled=true;

        //Increment the movements counter
        movements++;
        showMovements.innerHTML=`Movimientos: ${movements}`;
        if(firstResult==secondResult){
            uncoveredCard=0;

            //Increase correct answers
            success++;
            showSuccess.innerHTML=`Aciertos: ${success}`;
            if(success==8){
                clearInterval(tiempoRegresivoID);
                showSuccess.innerHTML=`Aciertos: ${success} &#128561`;
                showTime.innerHTML=`Fantastico! &#x1F973 Solo demoraste ${timerInitial-time} segundos y has ganado 20 puntos`;
                showMovements.innerHTML=`Movimientos: ${movements} &#128406 &#128526`;
                button.style.display="inline-block";
                button.innerHTML='Volver a jugar';
                if(usuario!=null){
                  fetch(`https://brainplayapi20230304144140.azurewebsites.net/api/Juego/MarcarCompletado?idUsuario=${usuario.value.id}&idJuego=${juegoID}`)
                }
            }
        }else{
            //Mostrar los valores y luego tapar
            setTimeout(() => {
                randomizar=false;
                card1.innerHTML=' ';
                card2.innerHTML=' ';
                card1.disabled=false;
                card2.disabled=false;
                uncoveredCard=0;
            }, 800);
        }
    }
}