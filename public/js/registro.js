function capitalize(texto) { // combierte en mayuscula la primera letra de la palabra
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}

const form = document.getElementById("formulario-registro");

function agregarUsuario(event) {
    event.preventDefault()
    const elements = event.target.elements;

    const user = {
        username: capitalize(elements.nombre.value),
        email: elements.email.value,
        password: elements.password.value,
        password2: elements.password2.value,
    }

    if(user.nombre == "" || user.email == "" || user.password == "" || user.password2 == ""){
        swal({
            title: `Uno o mas campos estan vacios`,
            icon: 'warning',
        })
    }else if(user.password != user.password2){
        swal({
            title: `Las contraseñas no coinciden`,
            icon: 'warning',
        })
    }else {
        console.log(JSON.stringify(user));
        fetch('/user/register',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data => {
            if(data.message === 'registrado'){
                swal({
                    title: `Usuario registrado`,
                    icon: 'success',
                })
                window.location.href = '/user/login';
            }else {
                swal({
                    title: data.message,
                    icon: 'warning',
                })
            }
        }).catch(error => {
            swal({
                title: error.message,
                icon: 'warning',
            })
        })
    }
}