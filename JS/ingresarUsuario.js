const form = document.getElementById('form-ingresar');
const url = 'https://brainplayapi20230304144140.azurewebsites.net/api/Account/IniciarSesion';

//cuando se presione el boton de tipo submit el código se ejecutará
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
    
    const info = new FormData(form);
    const jsonInfo = {};
    
    //Convertimos FormData a Json
    for (const [key, value] of info.entries()) {
        if (key === 'password') {
            // Si la clave es "password", calcula el hash SHA-256 de la contraseña y guárdalo en su lugar
            console.log(value)
            jsonInfo[key] = sha256(value);
            console.log(jsonInfo[key])
            console.log(sha256(value))
        } else {
            // De lo contrario, guarda el valor sin modificar
            jsonInfo[key] = value;
        }
    }

    const options = {
        method: 'POST',
        body: JSON.stringify(jsonInfo),
        headers: {
             'Content-Type': 'application/json'
        }
    };

    fetch(url, options)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        console.log(data.value);  

        if(data.value !== null){           
            //guardar los datos en el LocalStorage        
            localStorage.setItem('usuario',JSON.stringify(data));

            //recuperar el objeto de LocalStorage
            // let usuarioRecuperado = JSON.parse(localStorage.getItem('usuario'));
            // console.log("Recuperamos el objeto de LocalStorage")
            // console.log(usuarioRecuperado);            
            window.location.href = "index.html"; //Nos Dirige a la pagina principal
          
        }else{
            console.log("Correo o Contraseña incorrecta");
            const msg = document.getElementById('msg');
            msg.textContent = 'Correo o contraseña incorrecta';

            const email = document.getElementById('email');
            const password = document.getElementById('password');

            email.addEventListener('input', function() {
            msg.textContent = '';
            });

            password.addEventListener('input', function() {
                msg.textContent = '';
            });
        }
    })
    .catch(error => {
        // Hubo un error de red o de otra naturaleza
        console.log(error);
    });
});