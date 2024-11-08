import { Linea } from './Linea.js';
import { Utilidades } from './Utilidades.js';
class Factura {
    constructor(clienteNIF, fecha, hora, pagada) {
        this.clienteNIF = clienteNIF;
        this.fecha = new Date(fecha + " " + hora);
        this.pagada = pagada = 'on' ? 'Pagada' : 'Sin Pagar';
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
window.addEventListener("load", function () {
    let clienteNIF = document.getElementById('clienteNIF');
    let fecha = document.getElementById('fecha');
    let hora = document.getElementById('hora');
    let pagada = document.getElementById('pagada');
    let boton = document.getElementById('agregar');
    let mostrar = document.getElementById('mostrarfactura');
    boton.addEventListener("click", function () {
        let Factura1 = new Factura(clienteNIF.value, fecha.value, hora.value, pagada.value);
        Factura1.agregarLinea("Pan", 4, 1.00);
        Factura1.agregarLinea("Pan", 4, 1.00);
        mostrar.innerHTML = `<p>${Factura1.imprimirFactura()}</p>`;
    })
});
