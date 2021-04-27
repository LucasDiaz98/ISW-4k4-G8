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
    var compra = '<p><b>Calle</b>: ' + calle.value + '</p>' + '<p><b> Altura</b>: ' + altura.value + '</p>' + '<p><b>Ciudad</b>: ' + ciudad.value + '</p>' + '<p><b>Referencia</b>: ' + referencia.value + '</p>';
    if (monto.value != '') {
        compra = compra + '<p><b>Medio de pago</b>: ' + efectivo.value + '</p>' + '<p><b>Monto</b>: ' + monto.value + '</p>'

    }
    if (titular.value != '') {
        compra = compra + '<p><b>Medio de pago</b>: ' + tarjeta.value + '</p>' + '<p><b>Titular</b>: ' + titular.value + '</p>' + '<p><b>Numero de Tarjeta</b>: ' + numeroT.value + '</p>' + '<p><b>Fecha de Vencimiento</b>: ' + fechaV.value + '</p>' + '<p><b>CVV</b>: ' + cvv.value + '</p>'
    }

    if (envioInmediato.checked ) {
        compra = compra + '<p><b>Forma de envio</b>: ' + envioInmediato.value + '</p>'
    }

    if (envioFecha.checked ) {
        compra = compra + '<p><b>Forma de envio</b>: ' + envioFecha.value + '</p>'
    }

    console.log(compra);
    return compra + '<p><b>Total</b>: ' + total.value + '</p>';

}


function validarFechaVisa() {
    event.preventDefault();
    if ((mesV.value > 12 || mesV.value < 1) || (numeroT.value.charAt(0) != 4) || (anoV.value < 2021)) {
        Swal.fire({
            position: 'top',
            type: 'error',
            title: 'Oops...',
            text: 'Tarjeta invalida!',
            showConfirmButton: false,
            timer: 3000
        })
    }
    else {
        swal.fire({
            type: 'success',
            title: 'Tarjeta valida!',
            text: 'Su tarjeta está vigente ',
            showConfirmButton: false,
        })
        return (false);
    }
}



<<<<<<< HEAD
=======



function validarFechaEnvio(){
    var actual = new Date();
    var fechaHoraActual = ""+actual.getFullYear()+(actual.getMonth()+1)+actual.getDate()+actual.getHours()+actual.getMinutes()+actual.getSeconds();
    var fechaHoraEnvio = ""+fechaE.getFullYear()+(fechaE.getMonth()+1)+fechaE.getDate()+fechaE.getHours()+fechaE.getMinutes()+fechaE.getSeconds();
    
    if(fechaHoraActual < fechaHoraEnvio){
        alert("Por favor ingrese una fecha y hora valida");
    }
}

>>>>>>> 75c8657e7be7c961486596013a1e59dce33a8fb9
function validarMaster() {
    if (master.checked) {
        Swal.fire({
            type: 'error',
            title: 'Funcionalidad en desarrollo...',
            text: 'Disculpe las molestias',
            showConfirmButton: false,
            timer: 2000
        })
    }
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
        })
    }

    else if (altura.value == '' || altura.value == 0 || altura.value < 0) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Ingrese el numero de altura',
            showConfirmButton: false,
            timer: 2000
        })
    }



    else if (ciudad.value == 0 || ciudad.value == "") {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Debes seleccionar una ciudad',
            showConfirmButton: false,
            timer: 2000
        })
    }

    else if (!document.querySelector('input[name="opciones"]:checked')) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Debes elegir un medio de pago',
            showConfirmButton: false,
            timer: 2000
        })
    }

    else if (efectivo.checked && (monto.value == 0 || monto.value == '')) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Ingrese el monto con el que va a pagar',
            showConfirmButton: false,
            timer: 2000
        })
    }

    else if (!document.querySelector('input[name="opciones1"]:checked')) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Debes elegir una forma de envio',
            showConfirmButton: false,
            timer: 2000
        })
    }
    else if (tarjeta.checked && (titular.value == '' || numeroT.value == 0 || numeroT.charAt(0) == 5 || cvv.value <= 0 || cvv.value.length < 0)) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Ingrese nuevamente los datos de la tarjeta',
            showConfirmButton: false,
            timer: 2000
        })
    }

    else if (hayError != true) {
        swal.fire({

            title: "Detalle",
            html: armarString(),
            function: generarPDF(),
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
                    timer:3000
                }).then(function () {
                    window.location = "index.html";
                })
                
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
<<<<<<< HEAD
                window.location = "compra.html"
=======
                window.location = "compras.html"
>>>>>>> 75c8657e7be7c961486596013a1e59dce33a8fb9
            }
        })
    }
}


function generarPDF() {
    var elemento = document.getElementById('contenedor-prueba');

    html2pdf(elemento, {
        filename: 'Comprobante.pdf'
    })
}
<<<<<<< HEAD


// parsea datePicker y compara fecha seleccionada con la actual
function validarFechaRec() {
    var actual = new Date();
    var fechaHoraActual = "" + actual.getFullYear() + (actual.getMonth() + 1) + actual.getDate() + actual.getHours() + actual.getMinutes();
    var fechaEnvio = fechaE.value;
    var anioFechaE = fechaEnvio.slice(0, 4);
    var mesFechaE = fechaEnvio.slice(6,7);
    var diaFechaE = fechaEnvio.slice(8,10);
    var horaFechaE = fechaEnvio.slice(11,13);
    var minFechaE = fechaEnvio.slice(14,16);
    var fechaHoraEnvio = ""+anioFechaE + mesFechaE + diaFechaE + horaFechaE + minFechaE;

    if (fechaHoraEnvio < fechaHoraActual){
        swal.fire({
            type: 'error',
            title: 'La fecha ingresada es inválida',
            text: 'Porfavor ingrese una nueva',
            showConfirmButton: false,
        }
        )
    }
    else{
        swal.fire({
            type: 'success',
            title: 'La fecha ingresada es correcta',
            text: 'Siga con su compra...!',
            showConfirmButton: false,
        }
        )
    }
    
}
=======
>>>>>>> 75c8657e7be7c961486596013a1e59dce33a8fb9
