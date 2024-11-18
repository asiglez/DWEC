class Reparacion {
    constructor(reparacioId, vehiculoId, descripcion, fecha, kilometros, presupuesto, aprobada, pagado, terminado, trabajos) {
        this.reparacioId = reparacioId;
        this.vehiculoId = vehiculoId;
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.kilometros = kilometros;
        this.presupuesto = presupuesto;
        this.aprobada = aprobada;
        this.pagado = pagado;
        this.terminado = terminado;
        this.trabajos = trabajos;
    }
}
export default Reparacion;