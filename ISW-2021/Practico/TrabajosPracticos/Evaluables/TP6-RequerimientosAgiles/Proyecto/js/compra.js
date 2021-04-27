const compra = new Carrito();
const listaCompra = document.querySelector("#lista-compra tbody");
const carrito = document.getElementById('carrito');
const procesarCompraBtn = document.getElementById('procesar-compra');
const calle = document.getElementById('calle');
const altura = document.getElementById('altura');
const ciudad = document.getElementById('ciudad');
const referencia = document.getElementById('referencia');
const formadepago = document.getElementById('formadepago');
const tarjeta = document.getElementById('individual');
const efectivo = document.getElementById('multiples')
const monto = document.getElementById('monto');
const total = document.getElementById('total');
const titular = document.getElementById('titular');
const numeroT = document.getElementById('numeroT');
const fechaV = document.getElementById('fechaV');
const cvv = document.getElementById('cvv');
const envioInmediato = document.getElementById('ahora');
const envioFecha = document.getElementById('fechaRec');
const master = document.getElementById('master');
const mesV = document.getElementById('mesV');
const anoV = document.getElementById('anoV');
const fechaE = document.getElementById('fecha-hora');



cargarEventos();

function cargarEventos() {
    document.addEventListener('DOMContentLoaded', compra.leerLocalStorageCompra());

    //Eliminar productos del carrito
    carrito.addEventListener('click', (e) => { compra.eliminarProducto(e) });

    compra.calcularTotal();

    //cuando se selecciona procesar Compra
    procesarCompraBtn.addEventListener('click', procesarCompra);

    carrito.addEventListener('change', (e) => { compra.obtenerEvento(e) });
    carrito.addEventListener('keyup', (e) => { compra.obtenerEvento(e) });

}

function armarString() {
    var compra = '<p><b>Calle</b>: ' + calle.value + ' <b>Altura</b>: ' + altura.value + '</p>' + '<p><b>Ciudad</b>: ' + ciudad.value + '</p>' + '<p><b>Referencia</b>: ' + referencia.value + '</p>';
    if (monto.value != '') {
        compra = compra + '<p><b>Medio de pago</b>: ' + efectivo.value + '</p>' + '<p><b>Monto</b>: ' + monto.value + '</p>'

    }
    else if (titular.value != '') {
        compra = compra + '<p><b>Medio de pago</b>: ' + tarjeta.value + '</p>' + '<p><b>Titular</b>: ' + titular.value + '</p>' + '<p><b>Numero de Tarjeta</b>: ' + numeroT.value + '</p>' + '<p><b>Fecha de Vencimiento</b>: ' + fechaV.value + '</p>' + '<p><b>CVV</b>: ' + cvv.value + '</p>'
    }

    if (envioInmediato.value != '') {
        compra = compra + '<p><b>Forma de envio</b>: ' + envioInmediato.value + '</p>'
    }

    else if (envioFecha.value != '') {
        compra = compra + '<p><b>Forma de envio</b>: ' + envioFecha.value + '</p>'
    }

    console.log(compra);
    return compra + '<p><b>Total</b>: ' + total.value + '</p>';

}


function validarFechaVisa(){
    event.preventDefault();
    if ((mesV.value > 12 || mesV.value < 1) || (anoV.value < 2021)){
        Swal.fire({
            position:'top',
            type: 'error',
            title: 'Oops...',
            text: 'Tarjeta invalida!',
            showConfirmButton: false,
            timer: 3000
        }).then(function () {
            window.location = "compra.html";
        })
    }
    else{
        swal.fire({
            type: 'success',
            title: 'Tarjeta valida!',
            text: 'Su tarjeta está vigente ',
            showConfirmButton: false,
        })
    return (false);
}






function validarFechaEnvio(){
    var actual = new Date();
    var fechaHoraActual = ""+actual.getFullYear()+(actual.getMonth()+1)+actual.getDate()+actual.getHours()+actual.getMinutes()+actual.getSeconds();
    var fechaHoraEnvio = ""+fechaE.getFullYear()+(fechaE.getMonth()+1)+fechaE.getDate()+fechaE.getHours()+fechaE.getMinutes()+fechaE.getSeconds();
    
    if(fechaHoraActual < fechaHoraEnvio){
        alert("Por favor ingrese una fecha y hora valida");
    }
}

function validarMaster() {
    if (master.checked) {
        alert(`Funcionalidad en desarollo...` +
            `Disculpe las molestias`)
    }
    window.location = "compra.html";
}


function procesarCompra() {
    hayError = false;
    // e.preventDefault();
    if (compra.obtenerProductosLocalStorage().length === 0) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'No hay productos, selecciona alguno',
            showConfirmButton: false,
            timer: 2000
        }).then(function () {
            window.location = "index.html";
        })
    }

    else if (calle.value == '') {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Ingrese el nombre de la calle',
            showConfirmButton: true,
            timer: 2000
        }).then(function () {
            window.location = "compra.html";
        }
        )
    }

    else if (altura.value == '' || altura.value == 0 || altura.value < 0) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Ingrese el numero de altura',
            showConfirmButton: false,
            timer: 2000
        }).then(function () {
            window.location = "compra.html";
        })
    }



    else if (ciudad.value == 0 || ciudad.value == "") {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Debes seleccionar una ciudad',
            showConfirmButton: false,
            timer: 2000
        }).then(function () {
            window.location = "compra.html";
        })
    }

    else if (!document.querySelector('input[name="opciones"]:checked')) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Debes elegir un medio de pago',
            showConfirmButton: false,
            timer: 2000
        }).then(function () {
            window.location = "compra.html";
        })

    }

    else if (efectivo.checked && (monto.value == 0 || monto.value == '')) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Ingrese nuevamente los datos del pago',
            showConfirmButton: false,
            timer: 2000
        }).then(function () {
            window.location = "compra.html";
        })
    }

    else if (!document.querySelector('input[name="opciones1"]:checked')) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Debes elegir una forma de envio',
            showConfirmButton: false,
            timer: 2000
        }).then(function () {
            window.location = "compra.html";
        })
            ;
    }
    else if (tarjeta.checked && (titular.value == '' || numeroT.value == 0 || cvv.value <= 0 || cvv.value.length < 0)) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Ingrese nuevamente los datos de la tarjeta',
            showConfirmButton: false,
            timer: 2000
        }).then(function () {
            window.location = "compra.html";
        })
    }

    else if (hayError != true) {
        swal.fire({

            title: "Detalle",
            html: armarString(),
            showCancelButton: true,
            confirmButtonText: 'Confirmar Pago!',
            cancelButtonText: 'Cancelar',
            reverseButtons: true,
        }).then((result) => {
            if (result.value) {
                swal.fire({
                    type: 'success',
                    title: 'Pago Realizado',
                    text: 'Se realizo el pago correctamente',
                    showConfirmButton: false,

                }
                )
                window.location = "index.html"
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swal.fire({
                    type: 'error',
                    title: 'Se cancelo el pago',
                    text: 'Muchas gracias',
                    showConfirmButton: false,

                }
                )
                window.location = "compras.html"
            }
        })
    }
}

}

function generarPDF(){
    var elemento = document.getElementById('contenedor-prueba');

    html2pdf(elemento,{
        filename: 'Comprobante.pdf'
    })
}
