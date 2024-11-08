class Linea {
    constructor(concepto, cantidad, precio) {
        this.concepto = concepto;
        this.cantidad = cantidad;
        this.precio = precio;
    }
    get getPrecio() {
        return this.precio;
    }
    get getConcepto() {
        return this.concepto;
    }
    get getCantidad() {
        return this.cantidad;
    }
    set setConcepto(concepto) {
        this.concepto = concepto;
    }
    set setCantidad(cantidad) {
        this.cantidad = cantidad;
    }
    set setPrecio(precio) {
        this.precio = precio;
    }
}
export { Linea };