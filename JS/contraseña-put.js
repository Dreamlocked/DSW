
const botonCambiar = document.querySelector('#Cambiar-contraseña');
console.log(botonCambiar);
let usuarioTemp = localStorage.getItem("data");
let usuarioTempJson = JSON.parse(usuarioTemp);
console.log(usuarioTempJson)
let url = "https://brainplayapi20230304144140.azurewebsites.net/api/Usuario/Editar";
let contraseñaencriptada;
let alerta = document.getElementById('alerta');
// se tuvo que haber guardado la imagen en el localstorage;

botonCambiar.addEventListener('click',()=>{           
    let contraseña = document.getElementById('Contraseña');
    let confirmar_contraseña = document.getElementById('Confirmar-Contraseña');
      console.log(contraseña.value)
      console.log(confirmar_contraseña.value)
      console.log("llegue a la linea 12 del put")
       if(contraseña.value === confirmar_contraseña.value){
        contraseñaencriptada = sha256(contraseña.value);
        console.log(contraseñaencriptada)   ;     
       }else{
        alerta.innerHTML = `<p id="alerta" style="color:red;">Las contraseñas ingresadas no son iguales</p>`;
        return;
       }

      // objeto con los datos que queremos actualizar en la API
      const temp = {    
         "id": id,
         "nombre": usuarioTempJson.nombre,
         "apellido": usuarioTempJson.apellido,
         "fechanac": null,  
         "correo": null,
         "puntaje": null,
         "password": contraseñaencriptada, 
         "urlimage": usuarioTempJson.urlimage,
       };    
       console.log(temp)

      const options = {        
         method: 'PUT',
         body: JSON.stringify(temp),// convertimos los datos a formato JSON y los enviamos en el cuerpo de la solicitud
         headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}` // enviamos el token de autenticación en el encabezado Authorization
         }       
      };

      fetch(url, options)
      .then(response => {
        response.json(),
        window.location.href = "mi_perfil.html" })
      /* .then(datux => console.log(datux)) */
      .catch(error => console.log(error));

     
      
})