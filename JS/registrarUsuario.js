const form = document.getElementById('form-registrar');
const url = 'https://brainplayapi20230304144140.azurewebsites.net/api/Usuario/Guardar';

//cuando se presione el boton de tipo submit el código se ejecutará
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
    
    const info = new FormData(form);
    const jsonInfo = {};

    //Convertimos FormData a Json
    for (const [key, value] of info.entries()) {
        if (key === 'password') {
            // Si la clave es "password", calcula el hash SHA-256 de la contraseña y guárdalo en su lugar
            console.log(value);
            jsonInfo[key] = sha256(value);
            console.log(jsonInfo[key])
        } else {
            // De lo contrario, guarda el valor sin modificar
            jsonInfo[key] = value;
        }
    }

    console.log(jsonInfo)

    const options = {
        method: 'POST',
        body: JSON.stringify(jsonInfo),
        headers: {
             'Content-Type': 'application/json'
        }
    };

    fetch(url, options)
    .then(response => {        
        if (response.ok) {            
            console.log('¡Registro exitoso!');// La solicitud fue exitosa
            window.location.href = "Ingresar.html"; //nos dirige a la pagina para ingresar
        } else {
            // La API devolvió un error
            console.log('Hubo un problema al enviar el formulario API');
         }
        return response.json();
    }
    )
    .then(data => console.log(data))
    .catch(error => {
        // Hubo un error de red o de otra naturaleza
        console.log('Hubo un problema al enviar el formulario RN');
        console.log(error);
    });
});
