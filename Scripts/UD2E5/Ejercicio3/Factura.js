import { Linea } from './Linea.js';
import { Utilidades } from './Utilidades.js';
class Factura {
    constructor(clienteNIF, fecha, hora, pagada) {
        this.clienteNIF = clienteNIF;
        this.fecha = new Date(fecha + " " + hora);
        this.pagada = (pagada === true) ? 'Pagada' : 'Sin Pagar';
        this.lineas = [];
    }
    get importeTotal() {
        if (this.lineas.length === 0) {
            return 'No hay ninguna linea';
        } else {
            for (let a = 0; a < this.lineas.length; a++) {
                let importe = +this.lineas[a].precioUnitario * this.lineas[a].cantidad;
            }
            return this.importe;
        }
    }
    get numeroArticulos() {
        return this.lineas.length;
    }
    agregarLinea(concepto, cantidad, precio) {
        this.lineas.push(new Linea(concepto, cantidad, precio));
    }
    eliminarLinea() {
        this.lineas.pop();
    }
    imprimirFactura() {
        let impreso = `ClienteNIF: ${this.clienteNIF} <br>
    Fecha: ${this.fecha.getDate()}-${this.fecha.getMonth() + 1}-${this.fecha.getFullYear()}<br>
    Hora: ${this.fecha.getHours()}:${this.fecha.getMinutes()}<br>
    Pagada: ${this.pagada}<br>
    Lineas:<br>`;
        for (let linea of this.lineas) {
            impreso += (`Concepto: ${linea.getConcepto}<br>
            Cantidad: ${linea.getCantidad}<br>
            Precio: ${linea.getPrecio}<br>`);
        }
        return impreso;
    }
}
let Factura1 = Factura;
window.addEventListener("load", function () {
    let clienteNIF = document.getElementById('clienteNIF');
    let fecha = document.getElementById('fecha');
    let hora = document.getElementById('hora');
    let pagada = document.getElementById('pagada');
    let boton = document.getElementById('agregarfactura');
    let mostrar = document.getElementById('mostrarfactura');
    let concepto = document.getElementById('concepto');
    let cantidad = document.getElementById('cantidad');
    let precio = document.getElementById('precio');
    let boton1 = document.getElementById('agregarlinea');
    let boton2 = document.getElementById('eliminarlinea');
    let boton3 = document.getElementById('imprimir');
    let entrada = document.getElementById('entrada');
    let salida = document.getElementById('salida');
    let botonSerializar = document.getElementById('serializar');
    let botonDeserializar = document.getElementById('deserializar');
    boton.addEventListener("click", function () {
        if (pagada.checked) {
            Factura1 = new Factura(clienteNIF.value, fecha.value, hora.value, true);
        } else {
            Factura1 = new Factura(clienteNIF.value, fecha.value, hora.value, false);
            mostrar.innerHTML = `<p>${Factura1.imprimirFactura()}</p>`;
        }
    })
    boton1.addEventListener("click", function () {
        Factura1.agregarLinea(concepto.value, cantidad.value, precio.value);
    })
    boton2.addEventListener("click", function () {
        Factura1.eliminarLinea();
    })
    boton3.addEventListener("click", function () {
        mostrar.innerHTML = `<p>${Factura1.imprimirFactura()}</p>`;
    })
    botonSerializar.addEventListener("click", function () {
        try {
            let facturaJSON = Utilidades.serializarFactura(factura1);
            salida.value = facturaJSON;
        } catch (error) {
            alert("Error al serializar la factura.");
        }
    })
    botonDeserializar.addEventListener("click", function () {
        try {
            let facturaJSON = entrada.value;
            let facturaObjeto = Utilidades.deserializarFactura(facturaJSON);
            salida.value = JSON.stringify(facturaObjeto, null, 2);
        } catch (error) {
            alert("Error al deserializar el JSON. Asegúrate de que el formato es válido.");
        }
    })
});
