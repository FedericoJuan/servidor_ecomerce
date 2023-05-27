
function usuarioLogueado() {
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado")) || undefined;
    return usuarioLogueado;
}
