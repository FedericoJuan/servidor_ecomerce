function login(event) {
    event.preventDefault()
    
    const elements = event.target.elements;

    const userLogin = {
        email: elements.email.value,
        password: elements.password.value,
    }

    if(userLogin.email == "" || userLogin.password == ""){
        swal({
            title: `Uno o mas campos estan vacios`,
            icon: 'warning',
        })
    }else{
        fetch('/user/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userLogin)
        })
        .then(response => response.json())
        .then(data => {
            if(data.message === 'logueado'){
                localStorage.setItem("usuarioLogueado", JSON.stringify(data.user));
                window.user = data.user; // guardo el usuario en una variable global
                mostrarOcultarUsuarioLogueado();
                window.location.href = '/';
            }else {
                swal({
                    title: data.message,
                    icon: 'warning',
                })
            }
        }).catch(error => {
            console.log(error);
        })
    }
}