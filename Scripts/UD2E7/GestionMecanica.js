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
                ${vehiculo ? `<button id="ver-reparaciones" data-id="${vehiculo.vehiculoId}">Ver Reparaciones</button>` : ""}
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

        document.querySelector("#crear-vehiculo").addEventListener("click", () => {
            document.querySelector("#resultado").innerHTML = this.#generarHTMLVehiculo();
            this.#asignarEventosFormularioVehiculo();
        });

        document.querySelectorAll(".borrar-vehiculo").forEach(btn =>
            btn.addEventListener("click", e => {
                const vehiculoId = e.target.dataset.id;
                this.#clienteBD.borrarVehiculo(vehiculoId);
            })
        );
        document.querySelectorAll(".ver-reparaciones").forEach(btn =>
            btn.addEventListener("click", e => {
                const vehiculoId = e.target.dataset.id;
                this.#clienteBD.obtenerReparaciones("vehiculoId",vehiculoId);
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
}

export default GestionMecanica;