
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

function ready(){
    var botonesEliminarItem = document.getElementsByClassName('boton-eliminar');
    for(var i=0; i< botonesEliminarItem.length;i++){
        var button = botonesEliminarItem[i];
        button.addEventListener('click', eliminarItemCarrito);
    }

    var botonesSumar = document.getElementsByClassName('sumar');
    for(var i=0; i<botonesSumar.length; i++){
        var button = botonesSumar[i];
        button.addEventListener('click', sumar);
    }

    var botonesRestar = document.getElementsByClassName('restar');
    for(var i=0; i<botonesRestar.length; i++){
        var button = botonesRestar[i];
        button.addEventListener('click', restar);
    }

    var botonesAgregarCarrito = document.getElementsByClassName('boton-item');
    for(var i=0; i<botonesAgregarCarrito.length; i++){
        var button = botonesAgregarCarrito[i];
        button.addEventListener('click', agregaralcarrito);
    }

    document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagar);

}

function eliminarItemCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();

    actualizarTotalCarrito();

    ocultarCarrito();
}

function actualizarTotalCarrito() {
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;

    for (var i = 0; i < carritoItems.length; i++) {
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];

        var precio = parseFloat(precioElemento.innerText.replace('$', '').replace('.', ''));
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        var cantidad = cantidadItem.value;
        total = total + (precio * cantidad);
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total;
}

function ocultarCarrito() {
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if (carritoItems.childElementCount == 0) {
        var carrito = document.querySelector('.carrito');
        carrito.style.opacity = '1';
        var contenedorPrincipal = document.querySelector('.contenedor-principal');
        contenedorPrincipal.style.gridTemplateColumns = '100%';
    }
}

function sumar(event){
    var buttonClicked = event.target;
    var cantidad = buttonClicked.parentElement;
    var cantidadActual = cantidad.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual++;
    cantidad.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
}

function restar(event){
    var buttonClicked = event.target;
    var cantidad = buttonClicked.parentElement;
    var cantidadActual = cantidad.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual--;

    if(cantidadActual >= 0){
        cantidad.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrito();
    }
    
}

function agregaralcarrito(event){
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo')[0].innerText;
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagen = item.getElementsByClassName('img-item')[0].src;
    console.log(titulo);
    agregarItemAlCarrito(titulo, precio, imagen);

    hacervisiblecarrito();
    actualizarTotalCarrito();
}

function agregarItemAlCarrito(titulo, precio, imagen){
    var item = document.createElement('div');
    item.classList.add('items');

    var tituloNormalizado = titulo.trim().toLowerCase();

    var itemscarrito = document.getElementsByClassName('carrito-items')[0];
    var nombresitemscarrito = itemscarrito.getElementsByClassName('carrito-item-titulo');

    for (var i = 0; i < nombresitemscarrito.length; i++) {
        // Limpiar espacios en blanco alrededor del texto antes de comparar
        var nombreExistente = nombresitemscarrito[i].innerText.trim().toLowerCase();

        if (nombreExistente === tituloNormalizado) {
            alert('Este artículo ya está en el carrito');
            return; // Sale de la función si el artículo ya está en el carrito
        }
    }


    // Continúa con el resto de tu lógica para agregar el artículo al carrito

    var itemCarritoContenido =`
    <div class="carrito-item">
        <img src="${imagen}" alt="" width="100px">
        <div class="carrito-item-detalles">

            <span class="carrito-item-titulo">${titulo}</span>
            <div class="cantidad">
                <i class="fa-solid fa-minus restar"></i>
                <input type="text" value="1"class="carrito-item-cantidad" disabled>
                <i class="fa-solid fa-plus sumar"></i>
            </div>
            <span class="carrito-item-precio">${precio}</span>

        </div>
        <span class="boton-eliminar">
        <i class="fa-solid fa-trash"></i>
        </span>
        </div>
    
    `
    item.innerHTML = itemCarritoContenido;
    itemscarrito.append(item);

    item.getElementsByClassName('boton-eliminar')[0].addEventListener('click', eliminarItemCarrito);


    var botonsumacantidad = item.getElementsByClassName('sumar')[0];
    botonsumacantidad.addEventListener('click',sumar);

    var botonrestarcantidad = item.getElementsByClassName('restar')[0];
    botonrestarcantidad.addEventListener('click',restar);
}

function pagar(event){
    alert("Gracias por su compra");

    var carritoitems = document.getElementsByClassName('carrito-items')[0];
    while(carritoitems.hasChildNodes()){
        carritoitems.removeChild(carritoitems.firstChild);
    }
    actualizarTotalCarrito();
    ocultarCarrito();
}

function hacervisiblecarrito() {
    var contenedorPrincipal = document.querySelector('.contenedor-principal');
    contenedorPrincipal.style.gridTemplateColumns = '65% 35%';
    var carrito = document.querySelector('.carrito');
    carrito.style.opacity = '1';  
}

