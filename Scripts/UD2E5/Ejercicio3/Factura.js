'use strict';
import { Linea } from 'Linea.js';
class Factura {
    constructor(clienteNIF, fecha, hora, pagada) {
        this.clienteNIF = clienteNIF;
        this.fecha = new Date(fecha);
        this.hora = new Date(hora);
        this.pagada = pagada;
        this.lineas = new Array();
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
        let linea = new Linea(concepto, cantidad, precio);
        this.lineas.push(linea);
    }
    imprimirFactura() {
        return ``;
    }
}
let Factura= new Factura('72156747C','');