let nombre = document.getElementById('nombre');
let apellido = document.getElementById('apellido');
let FecNacimiento = document.getElementById('FecNacimiento');
let email = document.getElementById('email');
let passwordValidar = document.getElementById('password');
let confirmacionValidar = document.getElementById('confirmacion');
let enviar = document.getElementById('enviar');

$(document).ready(function(){
    $('#confirmacion').keyup(function() {
        comparar();  
    });
    $('#password').keyup(function() {
        comparar();       
    });
});

nombre.addEventListener('input', validarFormulario);
apellido.addEventListener('input', validarFormulario);
FecNacimiento.addEventListener('input', validarFormulario);
email.addEventListener('input', validarFormulario);
passwordValidar.addEventListener('input', validarFormulario);
confirmacionValidar.addEventListener('input', validarFormulario);

function comparar(){
    var password  =$('#password').val();
    var confirmacion = $('#confirmacion').val();

    if( password == confirmacion){
        $('#msgError').text('Coinciden!').css("color","green");
    }
    else if(confirmacion == ''){
        $('#msgError').text('No se puede dejar en blanco!').css("color","red");
    }
    else{
        $('#msgError').text('No coinciden!').css("color","red");
    }       
    
    confirmacionValidar.addEventListener('input', function() {
        msgError.textContent = '';
    });      
    passwordValidar.addEventListener('input', function() {
        msgError.textContent = '';
    });      
}

function validarFormulario() {    
    if (nombre.value && apellido.value && FecNacimiento.value && email.value && passwordValidar.value && confirmacionValidar.value) {
      if(passwordValidar.value==confirmacionValidar.value){
          enviar.disabled = false;
          enviar.style.backgroundColor = '#DD5C35'; 
      }
    } else {
      enviar.disabled = true;
    }
}

function ValidarTexto(input) {
    input.value = input.value.replace(/[^a-zA-Z ]/g, "");
}