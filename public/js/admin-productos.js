function ocultarFormulario() {
    document.getElementById('contenedor-form').style.display = 'none';
}

function mostrarFormulario() {
    document.getElementById('contenedor-form').style.display = 'block';
}

function agregarProducto() {
    document.getElementById('id').value = '';
    document.getElementById('producto').value = '';
    document.getElementById('descripcion').value = '';
    document.getElementById('precio').value = '';
    document.getElementById('imagen-form').value = '';
    mostrarFormulario();
}

function editarProducto(index){
    fetch('/product/' + index, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(res => res.json())
    .then(data => {
        const producto = data.product;
            document.getElementById('id').value = index
            document.getElementById('producto').value = producto.producto
            document.getElementById('descripcion').value = producto.descripcion
            document.getElementById('precio').value = producto.precio
            mostrarFormulario();
        })
        .catch(error => {
            swal({
                title: 'Error',
                text: error.message,
            })
        })
}

function guardarProducto(event) {
    event.preventDefault();

    const elements = event.target.elements;

    const producto = {
        producto: elements.producto.value,
        imagen: document.getElementById("imagen-form").files[0],
        descripcion: elements.descripcion.value,
        precio: elements.precio.value,
    }

    const url = elements.id.value !== '' ? '/product/' + elements.id.value : '/product/create';
    const data = new FormData();

    data.append('producto', producto.producto);
    data.append('imagen', producto.imagen);
    data.append('descripcion', producto.descripcion);
    data.append('precio', producto.precio);

    fetch(url, {
        method: elements.id.value !== '' ? 'PUT' : 'POST',
        body: data,
        headers: {
            'Authorization': JSON.parse(localStorage.getItem('usuarioLogueado')).token,
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
function eliminarProducto(index) {
    const response = confirm('Esta seguro que desea eliminar el producto?')
    if(response){
        const user = JSON.parse(localStorage.getItem('usuarioLogueado'));
        let token;
        if(user){
            token = user.token;    
        }
        fetch('/product/' + index, {
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