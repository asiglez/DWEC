import Bd from "./Bd.js";

class GestionMecanica {
    #clienteBD;
    #contenedor;
    constructor() {
        this.#clienteBD = new Bd();
        this.#contenedor = null;
    }
    iniciarApp(selector) {
        const contenedor = document.querySelector(selector);

        if (contenedor) {
            this.#contenedor = contenedor;
            this.#contenedor.innerHTML = this.#generaHTMLBase();
            this.#asignarEventos();
        } else {
            console.error("No se ha podido iniciar la aplicación. Contenedor no encontrado.");
        }
    }

    #generaHTMLBase() {
        return `
            <header>
                <h1>Gestión Mecánica</h1>
                <nav>
                    <button id="inicio">Inicio</button>
                    <button id="listado-vehiculos">Listado Vehículos</button>
                    <button id="listado-no-terminadas">No Terminadas</button>
                    <button id="listado-no-pagadas">No Pagadas</button>
                    <button id="listado-presupuestos">Presupuestos</button>
                </nav>
            </header>
            <main id="resultado">
                <!-- Aquí se cargarán los contenidos dinámicamente -->
            </main>
        `;
    }

    #generarHTMLInicio() {
        return `
            <section>
                <h2>Bienvenido a la Gestión Mecánica</h2>
                <form id="buscador-vehiculos">
                    <label for="filtro">Buscar por:</label>
                    <select id="filtro">
                        <option value="vehiculoId">ID del Vehiculo</option>
                        <option value="matricula">Matricula</option>
                        <option value="telefono">Teléfono</option>
                    </select>
                    <input type="text" id="valor" placeholder="Introduce el valor" />
                    <button type="submit">Buscar</button>
                </form>
                <div id="resultado-busqueda">
                </div>
            </section>
        `;
    }

    #generarHTMLVehiculos(vehiculos) {
        return `
            <section>
                <h2>Listado de Vehículos</h2>
                <button id="crear-vehiculo">Crear Nuevo Vehículo</button>
                <ul>
                    ${vehiculos
                .map(
                    vehiculo => `
                        <li>
                            <strong>${vehiculo.matricula}</strong> (${vehiculo.marca} ${vehiculo.modelo}) 
                            <button class="ver-vehiculo" data-id="${vehiculo.vehiculoId}">Ver</button>
                            <button class="ver-reparaciones" data-id="${vehiculo.vehiculoId}">Reparaciones</button>
                            <button class="borrar-vehiculo" data-id="${vehiculo.vehiculoId}">Borrar</button>
                        </li>
                    `
                )
                .join("")}
                </ul>
            </section>
        `;
    }

    #generarHTMLVehiculo(vehiculoId = null) {
        const vehiculo = vehiculoId
            ? this.#clienteBD.obtenerVehiculo("vehiculoId", vehiculoId)[0]
            : null;

        return `
            <section>
                <h2>${vehiculo ? "Editar Vehículo" : "Nuevo Vehículo"}</h2>
                <form id="form-vehiculo">
                    <input type="hidden" name="vehiculoId" value="${vehiculo?.vehiculoId || ""}" />
                    <label>Matrícula:</label>
                    <input type="text" name="matricula" value="${vehiculo?.matricula || ""}" required />
                    <label>Marca:</label>
                    <input type="text" name="marca" value="${vehiculo?.marca || ""}" required />
                    <label>Modelo:</label>
                    <input type="text" name="modelo" value="${vehiculo?.modelo || ""}" required />
                    <label>Año:</label>
                    <input type="number" name="año" value="${vehiculo?.año || ""}" required />
                    <label>Motor:</label>
                    <input type="text" name="motor" value="${vehiculo?.motor || ""}" required />
                    <fieldset>
                        <legend>Propietario</legend>
                        <label>Nombre:</label>
                        <input type="text" name="propietarioNombre" value="${vehiculo?.propietario.nombre || ""}" required />
                        <label>Teléfono:</label>
                        <input type="text" name="propietarioTelefono" value="${vehiculo?.propietario.telefono || ""}" required />
                        <label>Email:</label>
                        <input type="email" name="propietarioEmail" value="${vehiculo?.propietario.email || ""}" required />
                    </fieldset>
                    <button type="submit">${vehiculo ? "Guardar Cambios" : "Crear Vehículo"}</button>
                </form>
                ${vehiculo ? `<button id="ver-reparaciones2" data-id="${vehiculo.vehiculoId}">Ver Reparaciones</button>` : ""}
            </section>
        `;
    }

    #generarHTMLReparacionesVehiculo(vehiculoId) {
        const vehiculo = this.#clienteBD.obtenerVehiculo("vehiculoId", vehiculoId)[0];
        const reparaciones = this.#clienteBD.obtenerReparaciones("vehiculoId", vehiculoId)
            .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

        return `
            <section>
                <header>
                    <h2>Reparaciones de ${vehiculo.matricula}</h2>
                    <p>Teléfono del propietario: ${vehiculo.propietario.telefono}</p>
                    <button class="ver-vehiculo" data-id="${vehiculoId}">Ver Vehículo</button>
                </header>
                ${this.#generarHTMLReparaciones(reparaciones)}
            </section>
        `;
    }
    #generarHTMLReparaciones(reparaciones) {
        if (!reparaciones.length) {
            return `<p>No hay reparaciones registradas para este vehículo.</p>`;
        }

        return `
            <ul>
                ${reparaciones
                .map(
                    reparacion => `
                        <li>
                            <strong>${reparacion.fecha}:</strong> ${reparacion.descripcion}
                            <button class="ver-reparacion" data-id="${reparacion.reparacionId}">Ver</button>
                            <button class="borrar-reparacion" data-id="${reparacion.reparacionId}">Borrar</button>
                        </li>
                    `
                )
                .join("")}
            </ul>
        `;
    }
    #generarHTMLReparacion(reparacionId = 0, vehiculoId = 0) {
        const reparacion = reparacionId
            ? this.#clienteBD.obtenerReparacion("reparacionId", reparacionId)[0]
            : { vehiculoId, trabajos: [] };

        return `
            <section>
                <h2>${reparacionId ? "Editar Reparación" : "Nueva Reparación"}</h2>
                <form id="form-reparacion">
                    <input type="hidden" name="reparacionId" value="${reparacionId || ""}">
                    <input type="hidden" name="vehiculoId" value="${vehiculoId || reparacion.vehiculoId}">
                    <label>Descripción:</label>
                    <textarea name="descripcion" required>${reparacion.descripcion || ""}</textarea>
                    <label>Fecha:</label>
                    <input type="date" name="fecha" value="${reparacion.fecha || ""}" required>
                    <label>Kilómetros:</label>
                    <input type="number" name="kilometros" value="${reparacion.kilometros || ""}" required>
                    <fieldset>
                        <legend>Estado:</legend>
                        <label><input type="checkbox" name="presupuesto" ${reparacion.presupuesto ? "checked" : ""}> Presupuesto</label>
                        <label><input type="checkbox" name="aprobada" ${reparacion.aprobada ? "checked" : ""}> Aprobada</label>
                        <label><input type="checkbox" name="pagado" ${reparacion.pagado ? "checked" : ""}> Pagado</label>
                        <label><input type="checkbox" name="terminado" ${reparacion.terminado ? "checked" : ""}> Terminado</label>
                    </fieldset>
                    <fieldset>
                        <legend>Trabajos</legend>
                        <div id="form-trabajo">
                            <label>Concepto:</label>
                            <input type="text" id="concepto">
                            <label>Precio Unitario:</label>
                            <input type="number" id="precioUnitario">
                            <label>Cantidad:</label>
                            <input type="number" id="cantidad">
                            <button type="button" id="agregar-trabajo">Añadir Trabajo</button>
                        </div>
                        <ul id="listado-trabajos">
                            ${reparacion.trabajos
                .map(
                    (trabajo, index) => `
                                    <li>
                                        ${trabajo.concepto} - ${trabajo.cantidad} x ${trabajo.precioUnitario} = ${trabajo.totalTrabajo}
                                        <button type="button" class="borrar-trabajo" data-index="${index}">Borrar</button>
                                    </li>
                                `
                )
                .join("")}
                        </ul>
                    </fieldset>
                    <button type="submit">${reparacionId ? "Guardar Reparación" : "Crear Reparación"}</button>
                </form>
            </section>
        `;
    }
    #asignarEventos() {
        document.querySelector("#inicio").addEventListener("click", () => {
            document.querySelector("#resultado").innerHTML = this.#generarHTMLInicio();
            this.#asignarEventosInicio();
        });
    
        document.querySelector("#listado-vehiculos").addEventListener("click", () => {
            const vehiculos = this.#clienteBD.obtenerVehiculos();
            document.querySelector("#resultado").innerHTML = this.#generarHTMLVehiculos(vehiculos);
            this.#asignarEventosVehiculos();
        });
    
        document.querySelector("#listado-presupuestos").addEventListener("click", () => {
            alert("Funcionalidad aún no implementada");
        });
    
        document.querySelector("#listado-no-terminadas").addEventListener("click", () => {
            const reparacionesNoTerminadas = this.#clienteBD.obtenerReparaciones("terminado", false);
            if (reparacionesNoTerminadas.length) {
                document.querySelector("#resultado").innerHTML = this.#generarHTMLReparaciones(reparacionesNoTerminadas);
                this.#asignarEventosReparaciones(vehiculoId);
            } else {
                document.querySelector("#resultado").innerHTML = "<p>No hay reparaciones no terminadas.</p>";
            }
        });
        document.querySelector("#listado-no-pagadas").addEventListener("click", () => {
            const reparacionesNoPagadas = this.#clienteBD.obtenerReparaciones("pagado", false);
            if (reparacionesNoPagadas.length) {
                document.querySelector("#resultado").innerHTML = this.#generarHTMLReparaciones(reparacionesNoPagadas);
                this.#asignarEventosReparaciones(vehiculoId);
            } else {
                document.querySelector("#resultado").innerHTML = "<p>No hay reparaciones sin pagar.</p>";
            }
        });
    }

    #asignarEventosInicio() {
        document.querySelector("#buscador-vehiculos").addEventListener("submit", e => {
            e.preventDefault();
            const filtro = document.querySelector("#filtro").value;
            const valor = document.querySelector("#valor").value;
            const resultado = this.#clienteBD.obtenerVehiculo(filtro, valor);
            document.querySelector("#resultado-busqueda").innerHTML = this.#generarHTMLVehiculos(resultado);
            this.#asignarEventosVehiculos();
        });
    }

    #asignarEventosVehiculos() {
        document.querySelectorAll(".ver-vehiculo").forEach(btn =>
            btn.addEventListener("click", e => {
                const vehiculoId = e.target.dataset.id;
                document.querySelector("#resultado").innerHTML = this.#generarHTMLVehiculo(vehiculoId);
                this.#asignarEventosFormularioVehiculo();
            })
        );
    
        document.querySelectorAll(".ver-reparaciones").forEach(btn =>
            btn.addEventListener("click", e => {
                const vehiculoId = e.target.dataset.id;
                document.querySelector("#resultado").innerHTML = this.#generarHTMLReparacionesVehiculo(vehiculoId);
                this.#asignarEventosReparaciones(vehiculoId);
            })
        );
        document.querySelectorAll(".ver-reparaciones2").forEach(btn =>
            btn.addEventListener("click", e => {
                const vehiculoId = e.target.dataset.id;
                document.querySelector("#resultado").innerHTML = this.#generarHTMLReparacionesVehiculo(vehiculoId);
                this.#asignarEventosReparaciones(vehiculoId);
            })
        );
    
        document.querySelector("#crear-vehiculo").addEventListener("click", () => {
            document.querySelector("#resultado").innerHTML = this.#generarHTMLVehiculo();
            this.#asignarEventosFormularioVehiculo();
        });
    
        document.querySelectorAll(".borrar-vehiculo").forEach(btn =>
            btn.addEventListener("click", e => {
                const vehiculoId = e.target.dataset.id;
                this.#clienteBD.borrarVehiculo(vehiculoId);
                alert("Vehículo eliminado.");
                this.iniciarApp("#app");
            })
        );
    }
    #asignarEventosReparaciones(vehiculoId) {
        document.querySelectorAll(".ver-reparacion").forEach(btn =>
            btn.addEventListener("click", e => {
                const reparacionId = e.target.dataset.id;
                document.querySelector("#resultado").innerHTML = this.#generarHTMLReparacion(reparacionId, vehiculoId);
                this.#asignarEventosFormularioReparacion();
            })
        );
    
        document.querySelectorAll(".borrar-reparacion").forEach(btn =>
            btn.addEventListener("click", e => {
                const reparacionId = e.target.dataset.id;
                this.#clienteBD.borrarReparacion(reparacionId);
                alert("Reparación eliminada.");
                document.querySelector("#resultado").innerHTML = this.#generarHTMLReparacionesVehiculo(vehiculoId);
                this.#asignarEventosReparaciones(vehiculoId);
            })
        );
    }

    #asignarEventosFormularioVehiculo() {
        document.querySelector("#form-vehiculo").addEventListener("submit", e => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const vehiculo = Object.fromEntries(formData);
            if (vehiculo.vehiculoId) {
                this.#clienteBD.crearVehiculo(vehiculo);
            } else {
                this.#clienteBD.crearVehiculo(vehiculo);
            }
            alert("Vehículo guardado con éxito.");
        });
    }
    #asignarEventosFormularioReparacion() {
        const form = document.querySelector("#form-reparacion");
        const trabajos = document.querySelector("#listado-trabajos");
    
        document.querySelector("#agregar-trabajo").addEventListener("click", () => {
            const concepto = document.querySelector("#concepto").value;
            const precioUnitario = parseFloat(document.querySelector("#precioUnitario").value);
            const cantidad = parseInt(document.querySelector("#cantidad").value, 10);
    
            if (concepto && precioUnitario && cantidad) {
                const totalTrabajo = precioUnitario * cantidad;
                trabajos.innerHTML += `
                    <li>
                        ${concepto} - ${cantidad} x ${precioUnitario} = ${totalTrabajo}
                        <button type="button" class="borrar-trabajo">Borrar</button>
                    </li>
                `;
            }
        });
    
        trabajos.addEventListener("click", e => {
            if (e.target.classList.contains("borrar-trabajo")) {
                e.target.closest("li").remove();
            }
        });
    
        form.addEventListener("submit", e => {
            e.preventDefault();
            const formData = new FormData(form);
            const reparacion = Object.fromEntries(formData);
            reparacion.trabajos = Array.from(trabajos.children).map(item => {
                const text = item.textContent.split(" - ");
                const concepto = text[0];
                const cantidad = parseInt(text[1].split(" x ")[0], 10);
                const precioUnitario = parseFloat(text[1].split(" x ")[1].split(" = ")[0]);
                const totalTrabajo = parseFloat(text[1].split(" = ")[1]);
                return { concepto, precioUnitario, cantidad, totalTrabajo };
            });
    
            if (reparacion.reparacionId) {
                this.#clienteBD.guardarReparacion(reparacion);
            } else {
                this.#clienteBD.crearReparacion(reparacion);
            }
    
            alert("Reparación guardada con éxito.");
            this.iniciarApp("#app");
        });
    }
}
export default GestionMecanica;