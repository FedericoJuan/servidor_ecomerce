let ordenes = []

function agregarAlCarrito(id){
    if(usuarioLogueado() === undefined) {
        swal({
            title: "Debe estar logueado para agregar productos al carrito 🛒",
            icon: 'warning',
        })
    }
    const data = {
        userId: usuarioLogueado().id, 
        productId: id
    }

    fetch('/order/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': usuarioLogueado().token
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log(result)
        swal({
            title: result.message,
            icon: result.message === 'Producto agregado al carrito'? 'success': 'warning'
        })
        cantidadOrdenes()
    })   
}

function modificarCantidadDeOrdenEn(productId, quantity = 1){
    fetch('/order/modify-quantity', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': usuarioLogueado().token
        },
        body: JSON.stringify({
            userId: usuarioLogueado().id, 
            productId, 
            quantity
        })
    })
    .then(response => response.json())

    .then(result => {
        if(result.message === 'ok'){
            window.location.reload()
        }else {
            swal({
                title: result.message,
                icon: 'error'

            })
        }
    })
    .catch(error => {
        swal({
            title: error.message,
            icon: 'error'
        })
    })
}

function eliminarOrden(productId){
    response = confirm('¿Está seguro que desea eliminar este producto del carrito?')
    if(response){
        fetch('/order', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': usuarioLogueado().token
            },
            body: JSON.stringify({
                userId: usuarioLogueado().id, 
                productId
            })
        })
        .then(response => response.json())
        .then(result => {
            if(result.message === 'ok'){
                window.location.reload()
            }else {
                swal({
                    title: result.message,
                    icon: 'error'
                })
            }
        })
        .catch(error => {
            swal({
                title: error.message,
                icon: 'error'
            })
        })
    }
}

function cantidadOrdenes(){
    fetch('/order/' + usuarioLogueado().id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': usuarioLogueado().token
        }
    })
    .then(response => response.json())
    .then(result => {
        if(result.message === 'ok'){
            ordenes = result.orders
            if(ordenes.length > 0) {
                document.getElementById('indicador-carrito').innerHTML = ordenes.length
            }
        }else {
            swal({
                title: result.message,
                icon: 'error'
            })
        }
    })
    .catch(error => {
        swal({
            title: error.message,
            icon: 'error'
        })
    })
}

