
const botonCambiar = document.querySelector('#guardar_datos');
console.log(botonCambiar);
let url = "https://brainplayapi20230304144140.azurewebsites.net/api/Usuario/Editar";
let usuarioNavBar =  JSON.parse(localStorage.getItem("usuario"))
// se tuvo que haber guardado la imagen en el localstorage;

botonCambiar.addEventListener('click',()=>{           
    let nombreElemento = document.getElementById('Nombres');
    let apellidoElemento = document.getElementById('Apellidos');
    let fechanacElemento = document.getElementById('Cumpleaños');
      console.log(nombreElemento.value)
      console.log(apellidoElemento.value)
      console.log(fechanacElemento.value)
      console.log("llegue a la linea 20 del put")
       if(localStorage.getItem('imagen') != null){
        urlimageElemento = localStorage.getItem('imagen'); 
        console.log(urlimageElemento)        
       }else{
        urlimageElemento=null;
       }
      
      // objeto con los datos que queremos actualizar en la API
      const temp = {    
         "id": id,     
         "nombre": nombreElemento.value,
         "apellido": apellidoElemento.value,
         "fechanac": fechanacElemento.value,   
         "correo": null,
         "puntaje": null,
         "password": null,
         "urlimage": urlimageElemento,
       };    
       console.log(temp)
      usuarioNavBar.value.userName=nombreElemento.value;
      localStorage.setItem('usuario',JSON.stringify(usuarioNavBar));
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
        window.location.href = "mi_perfil.html"; })
      /* .then(datux => console.log(datux)) */
      .catch(error => console.log(error));

     
      
})