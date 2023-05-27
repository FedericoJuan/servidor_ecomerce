const rolSelector= {
    user: 0,
    admin: 1,
}

function mostrarFormulario() {
    document.getElementById('contenedor-formulario').style.display = 'block';
}

function ocultarFormulario() {
    document.getElementById("contenedor-formulario").style.display = "none";
}

function agregarUsuario() {
    document.getElementById('username').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('role').value = '';
    document.getElementById('role').options[rolSelector.user].selected = true; 
    document.getElementById('id').value = '';
    
    mostrarFormulario();
}

function editarUsuario(index){
    console.log(index);
    fetch('/user/' + index,{

        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': JSON.parse(localStorage.getItem('usuarioLogueado')).token,
        }
    })
    .then(res => res.json())
    .then(data => {

        const usuario = data.user;
        console.log(data.user);
        
        document.getElementById('id').value = index;
        document.getElementById('username').value = usuario.username;
        document.getElementById('email').value = usuario.email;
        document.getElementById('role').value = usuario.role;
        document.getElementById('role').options[rolSelector[usuario.role]].selected = true;
        mostrarFormulario();
    })
}

function guardarUsuario(event) {
    event.preventDefault();

    const elements = event.target.elements;

    const usuario = {
        username: elements.username.value,
        email: elements.email.value,
        password: elements.password.value,
        role: elements.role.value,
    }

    const url = elements.id.value !== '' ? '/user/' + elements.id.value : '/user/create';
    console.log(url);
    fetch(url, {
        method: elements.id.value !== '' ? 'PUT' : 'POST',
        body: JSON.stringify(usuario),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': JSON.parse(localStorage.getItem('usuarioLogueado')).token,
        }
    })
    .then(res => res.json())
    .then(json => {
        if(json.message === 'Usuario creado' || json.message === 'Usuario actualizado'){
          window.location.reload();
        }else{
            swal({
                title: 'Error',
                text: json.message,
            })
        }
    })
    .catch(error => {
        swal({
            title: 'Error',
            text: error.message,
        })
    })
}

function eliminarUsuario(index){
    const response = confirm('Esta seguro que desea eliminar al usuario?')
    if(response){
        const user = JSON.parse(localStorage.getItem('usuarioLogueado'));
        let token;
        if(user){
            token = user.token;    
        }
        fetch('/user/' + index, {
              method: 'DELETE',
                 headers: {
                     'Content-Type': 'application/json',
                     'authorization': token,
                 }
             })
             .then(res => res.json())
             .then(json => {
                 window.location.reload();
             })
                .catch(error => {
                    swal({
                        title: 'Error',
                        text: error.message,
                    })
                })
    }
}

ocultarFormulario();