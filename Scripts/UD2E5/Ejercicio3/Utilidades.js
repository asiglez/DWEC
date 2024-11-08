class Utilidades {
    static serializarFactura(facturaOBJ) {
        this.facturaOBJ = facturaOBJ;
        let cadenaJSON = JSON.stringify(facturaOBJ);
        return cadenaJSON;
    }
    static deserializarFactura(facturaJSON) {
        this.facturaJSON = facturaJSON;
        let objeto = JSON.parse(facturaJSON);
        return objeto;
    }
}
export { Utilidades };