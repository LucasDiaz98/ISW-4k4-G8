//Ignorar
//var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//La funcion alert en teoria abre una ventana con el mensaje pasado por parametro

//Esta funcion se ejecuta al hacer click en realizar pedido y desencadena todas las verificaciones
function realizarPedido() : void{
    var resultado : boolean = realizarValidaciones()
    if (resultado) {
        alert("El pedido se ha realizado con exito!") //Podria ser que cambie a otra ventana una vez se realize con exito
    }

}

function realizarValidaciones() : boolean{
    if (verificarDireccion && verificarMetodoPago && verificarProductos && verificarTiempoRecepcion){
        return true
    }
    return false
}



function validarTarjeta(tarjeta : Tarjeta) : boolean{
    var res : boolean = true;
    if (tarjeta.numero.charAt(0) != '5') {
        alert("Por favor ingrese una tarjeta visa")
        res = false;
    }
    if (tarjeta.numero.length != 16) {
        alert("Por favor ingrese todos los numeros de la tarjeta")
        res = false;
    }
    if (tarjeta.nombre.length == 0) {
        alert('Por favor ingrese el nombre del titular de la tarjeta')
        res = false;
    }
    if (tarjeta.apellido.length == 0) {
        alert('Por favor ingrese el apellido del titular de la tarjeta')
        res = false;
    }
    if (tarjeta.CVC.length == 0){
        alert('Por favor ingrese el CVC de la tarjeta')
        res = false;
    }
    if (tarjeta.fechaVto.length == 0){
        alert('Por favor ingrese la fecha de vencimiento de la tarjeta')
        res = false;
    }
    return res
}




function verificarTiempoRecepcion() : boolean{
    var seleccion : string = 'Lo antes posible' //cargar seleccion segun la opcion elegida
    var horaEspecificada : number = 2097 //Hay que adaptar y convertir las fechas una vez este hecho el form, seguramente haya que modificar bastante de esta funcion
    var today = new Date();
    var res = true
    if (seleccion != 'Lo antes posible') {
        var date = today.getFullYear()+(today.getMonth()+1)+today.getDate();
        if (date < horaEspecificada) {
            alert("Por favor ingrese una fecha valida")
            res = false
        }
    }
    return res
}


function verificarMetodoPago () : boolean{
    var seleccion : string = 'efectivo' //Asignar la seleccion al del formulario
    var res = true
    if (seleccion == 'efectivo'){
        var efectivo : number = 100.00; //Asignar el numero al texto del efectivo
        if (efectivo < 0 || efectivo == null) {
            alert("Por favor ingrese una cantidad valida de efectivo")
            res = false;
        }
    }
    if (seleccion == 'tarjeta'){
        var tarjeta : Tarjeta = cargarDatosTarjeta();
        res = validarTarjeta(tarjeta)
    }
    return res
}

function verificarDireccion () : boolean{
    var calle: string = 'colon'; //Cargar variables con los textos del formulario
    var nroCalle : number = 100; // 
    var ciudad : string = 'Cordoba'; //
    var res = true;
    if (calle == ''){
        alert('Por favor ingrese una calle')
        res = false;
    }
    if (nroCalle == null){
        alert('Por favor ingrese la altura de la calle')
        res = false;
    }
    if (ciudad != 'Cordoba' && ciudad != 'Buenos Aires' && ciudad != 'Rosario' && ciudad != 'Cosquin')
    {
        alert('No selecciono ninguna ciudad')
        res = false;
    }
    return res;
}


function cargarDatosTarjeta() : Tarjeta{
    var nombre : string = 'Alex' //Cargar con los datos de la tarjeta
    var apellido : string; 'Cerutti' //
    var numero : string; '5135134135' //
    var fechaVto : string; '4/25' //
    var CVC : string; '999' //
    var tarjeta : Tarjeta = new Tarjeta(nombre, apellido, numero, fechaVto, CVC);
    return tarjeta
}

function verificarProductos(){
    var productos : string[] = ['Papas', 'Gaseosa']
    if (productos.length == 0){
        alert('No tiene ningun producto agregado')
    }
}

class Tarjeta {
    nombre : string;
    apellido : string;
    numero : string;
    fechaVto : string;
    CVC : string;

    constructor(nombre : string , apellido : string, numero : string, fechaVto : string, CVC : string){
        this.nombre = nombre;
        this.apellido = apellido;
        this.numero = numero;
        this.fechaVto = fechaVto;
        this.CVC = CVC; 
    }
}
