
function mostrarOcultarUsuarioLogueado() {
    if(usuarioLogueado()){

        document.getElementById('cart-link').style.display = 'flex'; 
        document.getElementById('cart-link').href = '/orders/' + usuarioLogueado().id
        document.getElementById('nav-usuario').innerHTML = usuarioLogueado().username;
        document.getElementById("contenedor-autenticacion-usuario").style.display = "flex";
        document.getElementById("contenedor-autenticacion-login").style.display = "none";
        document.getElementById('rutas-admin').style.display = 'block';

        if(usuarioLogueado().role == 'admin'){
            document.getElementById('rutas-admin').style.display = 'flex';
        }else{
            document.getElementById('rutas-admin').style.display = 'none';
        }
    }else{
        document.getElementById('cart-link').style.display = 'none'
        document.getElementById("contenedor-autenticacion-usuario").style.display = "none";
        document.getElementById("contenedor-autenticacion-login").style.display = "flex";
        document.getElementById('rutas-admin').style.display = 'none';
    }
}

function logout() {
    localStorage.removeItem("usuarioLogueado");
    mostrarOcultarUsuarioLogueado();
}


function indicadorCarrito() {
    const contadorCarrito = contarOrdenesEnElCarrito();
    if(contadorCarrito > 0){
        document.getElementById('indicador-carrito').innerHTML = contadorCarrito;
    }
}

mostrarOcultarUsuarioLogueado();    
indicadorCarrito();