import Propietario from "./Propietario";
import Reparacion from "./Reparacion";
import Trabajo from "./Trabajo";
import Vehiculo from "./Vehiculo";
import datos from "./datos-taller";
class Bd {
    constructor() {
        let coleccionVehiculos = datos.vehiculos.map(vehiculo => new Vehiculo(vehiculo.vehiculoId, vehiculo.matricula, vehiculo.marca, vehiculo.modelo, vehiculo.año, vehiculo.motor, new Propietario(vehiculo.propietario.nombre, vehiculo.propietario.telefono, vehiculo.propietario.email)));
        let coleccionReparaciones = datos.reparaciones.map(reparacion => new Reparacion(reparacion.reparacionId, reparacion.vehiculoId, reparacion.descripcion, reparacion.fecha, reparacion.kilometros, reparacion.presupuesto, reparacion.aprobada, reparacion.pagado, reparacion.terminado, datos.trabajos.map(trabajo => new Trabajo(trabajo.concepto, trabajo.precioUnitario, trabajo.cantidad, trabajo.totalTrabajo))));
    }
    get siguienteReparacionId() {
        return coleccionReparaciones.length()++;
    }
    get siguienteVehiculoId() {
        return coleccionVehiculos.length()++;
    }
    obtenerVehiculos() {
        return coleccionVehiculos;
    }
    obtenerVehiculo(filtro = "vehiculoId", valor = null) {
        switch (filtro) {
            case 'vehiculoId':
                return coleccionVehiculos.filter(vehiculo => vehiculo.vehiculoId.includes(valor));
            case 'matricula':
                return coleccionVehiculos.filter(vehiculo => vehiculo.matricula.includes(valor));
            case 'telefono':
                return coleccionVehiculos.filter(vehiculo => vehiculo.telefono.includes(valor));
            default:
                return 'El filtro esta mal';
        }
    }
}