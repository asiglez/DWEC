import Propietario from "./Propietario.js";
import Reparacion from "./Reparacion.js";
import Trabajo from "./Trabajo.js";
import Vehiculo from "./Vehiculo.js";
import datos from "./datos-taller.js";
class Bd {
    #coleccionVehiculos;
    #coleccionReparaciones;
    constructor() {
        this.#coleccionVehiculos = datos.vehiculos.map(vehiculo => new Vehiculo(vehiculo.vehiculoId, vehiculo.matricula, vehiculo.marca, vehiculo.modelo, vehiculo.año, vehiculo.motor, new Propietario(vehiculo.propietario.nombre, vehiculo.propietario.telefono, vehiculo.propietario.email)));
        this.#coleccionReparaciones = datos.reparaciones.map(reparacion => new Reparacion(reparacion.reparacionId, reparacion.vehiculoId, reparacion.descripcion, reparacion.fecha, reparacion.kilometros, reparacion.presupuesto, reparacion.aprobada, reparacion.pagado, reparacion.terminado, reparacion.trabajos.map(trabajo => new Trabajo(trabajo.concepto, trabajo.precioUnitario, trabajo.cantidad, trabajo.totalTrabajo))));
    }
    get #siguienteReparacionId() {
        return this.#coleccionReparaciones.length++;
    }
    get #siguienteVehiculoId() {
        return this.#coleccionVehiculos.length++;
    }
    obtenerVehiculos() {
        return this.#coleccionVehiculos;
    }
    obtenerVehiculo(filtro = "vehiculoId", valor = null) {
        switch (filtro) {
            case 'vehiculoId':
                return this.#coleccionVehiculos.filter(vehiculo => String(vehiculo.vehiculoId).includes(valor));
            case 'matricula':
                return this.#coleccionVehiculos.filter(vehiculo => vehiculo.matricula.includes(valor));
            case 'telefono':
                return this.#coleccionVehiculos.filter(vehiculo => vehiculo.propietario.telefono.includes(valor));
            default:
                return 'El filtro esta mal';
        }
    }
    crearVehiculo(vehiculo) {
        let nuevoVehiculo = new Vehiculo(vehiculo.vehiculoId, vehiculo.matricula, vehiculo.marca, vehiculo.modelo, vehiculo.año, vehiculo.motor, vehiculo.propietario);
        this.#coleccionVehiculos.push(nuevoVehiculo);
    }
    borrarVehiculo(vehiculoId) {
        this.#coleccionVehiculos = this.#coleccionVehiculos.filter(vehiculo => String(vehiculo.vehiculoId) !== vehiculoId);
    }
    obtenerReparaciones(filtro = "fecha", valor = null) {
        switch (filtro) {
            case 'vehiculoId':
                return this.#coleccionReparaciones.filter(reparacion => String(reparacion.vehiculoId).includes(valor));
            case 'fecha':
                return this.#coleccionReparaciones.filter(reparacion => reparacion.fecha.includes(valor));
            case 'pagado':
                return this.#coleccionReparaciones.filter(reparacion => reparacion.pagado === valor);
            case 'terminado':
                return this.#coleccionReparaciones.filter(reparacion => reparacion.terminado === valor);
            default:
                return 'El filtro esta mal';
        }
    }
    obtenerReparacion(reparacionId) {
        return this.#coleccionReparaciones.filter(reparacion => String(reparacion.reparacionId).includes(reparacionId));
    }
    crearReparacion(vehiculoId, reparacion) {
        let nuevaReparacion = new Reparacion(reparacion.reparacionId, vehiculoId, reparacion.descripcion, reparacion.fecha, reparacion.kilometros, reparacion.presupuesto, reparacion.aprobada, reparacion.aprobada, reparacion.pagado, reparacion.terminado, reparacion.trabajos);
        this.#coleccionReparaciones.push(nuevaReparacion);
    }
    borrarReparacion(reparacionId) {
        this.#coleccionReparaciones = coleccionReparaciones.filter(reparacion => reparacion.reparacionId !== reparacionId);
    }
}
export default Bd;