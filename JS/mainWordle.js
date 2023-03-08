//obtener parametro
let paramURL = window.location.search;
let parametrosURL = new URLSearchParams(paramURL);
let juegoID = parametrosURL.get('idJuego');

let usuario=JSON.parse(localStorage.getItem("usuario"))


let resultElement = document.querySelector('.result');
let mainContainer = document.querySelector('.main-container');
let rowId=1;
let puntaje=0;

// Arreglo con 50 palabras 
const wordList = [
    "abogado","aguacate","auto","andes","barco",
    "bolsa","botella","camisa","casa","cine",
    "dedo","diente","elefante","estrella","escuela",
    "fruta","fresa","gato","guitarra","helado",
    "huevo","iglesia","iguana","isla","jirafa",
    "kilogramo","koala","luna","mano","manzana",
    "naranja","nido","oso","oruga","pato","perro",
    "queso","quiosco","rana","silla","taza",
    "tigre","uva","universidad","vaca","vino",
    "waffle","yate","yogur","zanahoria","zapato"
];  

// Seleccionar una palabra al azar
const randomIndex = Math.floor(Math.random() * wordList.length);
const final = wordList[randomIndex];
// Mostrar la palabra seleccionada al azar
console.log(final);

let word= wordList[randomIndex];
let wordArray= word.toUpperCase().split('');
console.log(wordArray); 
let actualRow= document.querySelector('.row');

drawSquares(actualRow);
listenInput(actualRow);
addfocus(actualRow);


function listenInput(actualRow){
    let squares = actualRow.querySelectorAll('.square');
    squares = [...squares];

    let userInput = [];

    squares.forEach(element=>{
        element.addEventListener('input', event=>{
            //Si no se ha borrado
            if(event.inputType !== 'deleteContentBackward'){
                //Recoger el ingreso del usuario
                userInput.push(event.target.value.toUpperCase());
                console.log(userInput)
                //validar si existe un elemento a la derecha
                if(event.target.nextElementSibling){
                    event.target.nextElementSibling.focus();
                }else{
                    //armar un arreglo con el resultado antes de comparar
                    let squaresFilled = document.querySelectorAll('.square');
                    squaresFilled = [...squaresFilled];
                    let lastMiddleSquareFilled = squaresFilled.slice(-word.length);
                    let finalUserInput = []; 
                    lastMiddleSquareFilled.forEach(element=>{
                        finalUserInput.push(element.value.toUpperCase());
                    })

                    console.log(finalUserInput);
                    console.log(userInput);

                    //comparar arreglos para cambiar estilos
                    let rightIndex = compareArrays(wordArray,finalUserInput)
                    console.log(rightIndex);
                    rightIndex.forEach(element=>{
                        squares[element].classList.add('green');
                    })
                    //Si los arreglos son iguales
                    if(rightIndex.length == wordArray.length){
                        puntaje +=20;
                        showResult('Ganaste');
                        if(usuario!=null){
                          fetch(`https://brainplayapi20230304144140.azurewebsites.net/api/Juego/MarcarCompletado?idUsuario=${usuario.value.id}&idJuego=${juegoID}`)
                        }
                        return;
                    }
                    //Cambiar estilos si existe la letra pero no esta en la posicion correcta
                    let existIndexArray = existLetter(wordArray,finalUserInput)
                    console.log(existIndexArray)
                    existIndexArray.forEach(element=>{
                        squares[element].classList.add('gold');
                    })
                    //Crear una nueva fila  
                    let actualRow = createRow();
                    if(!actualRow){
                        return;
                    }
                    drawSquares(actualRow);
                    listenInput(actualRow);
                    addfocus(actualRow);
                }        
            }else{
                userInput.pop();
            }            
            console.log(userInput)
        });
    })
}




//FUNCIONES

function compareArrays(array1,array2){
    let iqualsIndex = [];
    array1.forEach((element,index)=>{
        if(element == array2[index]){
            console.log(`En la posicion ${index} si son iguales`);
            iqualsIndex.push(index);
        }else{
            console.log(`En la posicion ${index} no son iguales`);
        }        
    });
    return iqualsIndex;
}

function existLetter(array1,array2){
    let existIndexArray = [];
    array2.forEach((element,index)=>{
        if(element!== array1[index] && array1.includes(element)){
            //
            existIndexArray.push(index);
        }
    });
    return existIndexArray;
}

function createRow(){
    rowId++;
    if(rowId <= wordArray.length+1){
        let newRow = document.createElement('div');
        newRow.classList.add('row');
        newRow.setAttribute('id',rowId);
        mainContainer.appendChild(newRow);
        return newRow;
    }else{
        //showResult('Intentalo de nuevo');
        showResult(`Intentalo de nuevo, la respuesta correcta era "${word.toUpperCase()}"`);
    } 
}

function drawSquares(actualRow){
    wordArray.forEach((item,index) =>{
        if(index===0){
            actualRow.innerHTML += `<input type="text" maxlength="1" class="square focus">`
        }else{
            actualRow.innerHTML += `<input type="text" maxlength="1" class="square">`
        }    
    })
}

function addfocus(actualRow){
    let focusElement = actualRow.querySelector('.focus');
    console.log(focusElement);
    focusElement.focus();
}

function showResult(textMsg){
    resultElement.innerHTML = `
    <p>${textMsg}</p>
    <p>${puntaje} puntos</p>
    <button class="button">Reiniciar</button>`    

    let resetBtn = document.querySelector('.button');
    resetBtn.addEventListener('click',()=>{
    location.reload();
      
 });
}