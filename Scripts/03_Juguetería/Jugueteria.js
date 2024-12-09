'use strict'
import datos from "./datos.js"
import { Juguete } from "./Jueguete.js"

class Jugueteria {
    #contenedor
    #juguetes
    #contador

    constructor() {
        this.#juguetes = this.obtenerJuguetes();
        this.#contador = this.#juguetes.length;
    }
    get contador() {
        return ++this.#contador;
    }

    iniciarApp(selector) {
        if (this.#contenedor !== null) {
            this.#contenedor = selector;
            this.#navegarInicio();
        } else {
            alert('Error, no se puede iniciar la aplicacion')
        }
    }

    /**Función que filtra por nombre, si no se pone ningún parámetro, mostrará todos los juguetes 
     * @param {NombreJuguete} [filtro] 
     * @returns {[]}
    */
    obtenerJuguetes(filtro = null) {
        let listaJuguetes = [];
        let encontrado = false;
        if (filtro === null) {
            for (let juguete of datos) {
                let jugueteNuevo = new Juguete(parseInt(juguete.jugueteId), juguete.nombre, juguete.marca, parseFloat(juguete.precio));
                listaJuguetes.push(jugueteNuevo);
            }
        } else {
            datos.forEach(juguete => {
                if (juguete.nombre == filtro) {
                    let jugueteNuevo = new Juguete(parseInt(juguete.jugueteId), juguete.nombre, juguete.marca, parseFloat(juguete.precio));
                    listaJuguetes.push(jugueteNuevo);
                    encontrado = true;
                }
            });

            /**Si no existe el juguete con ese nombre, me mostrará todos los juguetes */
            if (!encontrado) {
                listaJuguetes = this.obtenerJuguetes();
            }
        }

        return listaJuguetes;
    }

    /**Función que busca un juguete por id
     * @param {int} idJuguete
     * @returns {Juguete|undefined} 
     */
    obtenerJuguete(idJuguete) {
        let jugueteEncontrado;

        this.#juguetes.forEach(juguete => {
            if (juguete.jugueteId == idJuguete) {
                jugueteEncontrado = juguete;
            }
        });

        return jugueteEncontrado;
    }

    /**Función que crea un nuevo Juguete 
     * @param {Juguete} nuevo
     * @returns {void} 
    */
    crearJuguete(nuevo) {
        let jugueteNuevo = {};

        jugueteNuevo.jugueteId = nuevo.jugueteId;
        jugueteNuevo.nombre = nuevo.nombre;
        jugueteNuevo.marca = nuevo.marca;
        jugueteNuevo.precio = nuevo.precio;

        datos.push(jugueteNuevo);
    }

    /**
     * Función que borra un juguete
     * @param {int} idJuguete 
     * @returns {void}
     */
    borrarJuguete(idJuguete) {
        /**Obtengo el indice donde está situado el juguete que quiero borrar */
        let indiceJuguete = datos.findIndex(juguete => juguete.jugueteId === idJuguete);

        /**Si me lo encuentra, me lo borra. Si no lo encuentra, me devolverá -1 */
        if (indiceJuguete !== -1) {
            datos.splice(indiceJuguete, 1);
        }
    }

    /** Compone la vista de inicio y la inserta en el contenedor, 
     * comprueba los eventos 
     * @returns {void}
     * */
    #navegarInicio() {
        this.#contenedor.innerHTML = '';
        this.#contenedor.innerHTML += this.generarHTMLNavegacion();
        this.#contenedor.innerHTML += this.generarHTMLBuscador();

    }

    /**
     *  Compone la vista de listado de juguetes y la 
     * inserta en el contenedor, comprueba los eventos
     * @returns {void}
     */
    #navegarListadoJuguetes() {
        this.#contenedor.innerHTML = '';
        this.#contenedor.innerHTML += this.generarHTMLNavegacion();
        this.#contenedor.innerHTML += this.generarHTMLBuscador();
        let result = document.querySelector('.mostrarResult');
        result.innerHTML=this.generarHTMLListadoJuguetes(this.obtenerJuguetes());
        result.addEventListener('click', this.asignarEventoListado());
    }

    /**
     * Compone la vista de propiedades a partir 
     * del juguete y la inserta en el contenedor, comprueba los eventos.
     * @param {Juguete} juguete 
     * @returns {void}
     */
    #navegarPropiedades(juguete) {
        this.#contenedor.innerHTML = '';
        this.#contenedor.innerHTML = this.generarHTMLNavegacion();
        this.#contenedor.innerHTML += juguete.generarHTMLPropiedades();
    }

    /**
     * Compone la vista formulario
     * @returns {void}
     */
    #navegarFormulario() {
        this.#contenedor.innerHTML = '';
        this.#contenedor.innerHTML = this.generarHTMLNavegacion();
        this.#contenedor.innerHTML += this.generarHTMLFormulario();
    }

    /**
     *  Asigna para cada vista sus  eventos específicos 
     * de dicho componente.
     * @returns {void}
     */
    asignarEventos() {
        /**Recojo el elemento que realiza el click */
        let elemento = event.target;
        /**Recojo la vista que pertenece el elemento anterior
         * vista es un data que he creado para diferenciar cuando estoy en el navegador, en el listado o en el buscador
         */
        let vistaSeleccionada = elemento.dataset.vista;
        switch (vistaSeleccionada) {
            case "navegador":
                this.asignarEventoNavegador();
                break;
            case "buscador":
                this.asignarEventoBuscador();
                break;
            case "listado":
                this.#navegarListadoJuguetes();
                break;
        }
    }

    /**Asigno eventos del buscador, dependiendo de el elemento que clicke 
     * @returns {void}
    */
    asignarEventoBuscador() {

        /**Este es un contenedor donde meto la tabla */
        let contenedorResultados = document.querySelector('.mostrarResult');
        /**Recojo el valor del input del buscador */
        let valor = document.querySelector('#introFiltro').value;

        /**Recojo la accion del elemento target */
        let accion = event.target.dataset.accion;
        if (accion === 'filtrar') {

            /**Dependiendo de lo que me introduzca, me listará todos los juguetes o solo el juguete por nombre */
            if (valor != '') {
                contenedorResultados.innerHTML = '';
                contenedorResultados.innerHTML = this.generarHTMLListadoJuguetes(this.obtenerJuguetes(valor));
            } else {
                contenedorResultados.innerHTML = '';
                contenedorResultados.innerHTML = this.generarHTMLListadoJuguetes(this.obtenerJuguetes());
            }
        }
    }

    /**
     * Asigno los eventos del navegador
     * @returns {void}
     */
    asignarEventoNavegador() {
        /**Al ser enlaces y no botones, evitosu accion de redirigir */
        event.preventDefault();

        /**Recojo la accion */
        let accion = event.target.dataset.accion;

        switch (accion) {
            case "irInicio":
                this.#navegarInicio();
                break;
            case "irListado":
                this.#navegarListadoJuguetes();
                break;
        }
    }

    /**
     * Asigno los eventos dentro de la tabla de juguetes
     * Son los botones de borrar,crear y ver
     * @returns {void}
     */
    asignarEventoListado() {
        /**Como tengo los botones metidos en un div, el parentElementChild, me va a coger ese div 
         * y con closest va a cogerme el elemento más cercano, es decir, la fila */
        let fila = event.target.parentElement.closest('.fila');

        /**Recojo la accion */
        let accion = event.target.dataset.accion;

        /**Aquí guardaré el id que está metido en la fila */
        let idJuguete;

        /**Recojo el div donde está ña tabla */
        let result = document.querySelector('.mostrarResult');
        event.preventDefault();
        switch (accion) {
            case 'borrar':

            /**Metí la id en una data */
                idJuguete = fila.dataset.juguete;
                this.borrarJuguete(parseInt(idJuguete));

                /**Después de borrar, cargo otra vez la tabla */
                result.innerHTML = '';
                result.innerHTML = this.generarHTMLListadoJuguetes(this.obtenerJuguetes());
                break;
            case 'ver':
                idJuguete = fila.dataset.juguete;
                let juguete = this.obtenerJuguete(idJuguete);
                /**Al obtener el juguete, muestro la vista de propiedades del juguete */
                this.#navegarPropiedades(juguete);
                break;
            case 'crearJuguete': {
                /**Muestro la vista formulario */
                this.#navegarFormulario();
            }
        }
    }

    /**Crea el menú de navegacion
     * @returns {HTMLElement}
     */
    generarHTMLNavegacion() {
        return `
        <header>
            <ul>
                <li><a href="#" data-vista="navegador" data-accion="irInicio">INICIO</a></li>
                <li><a href="#" data-vista="navegador" data-accion="irListado">LISTADO</a></li>
            </ul>
        </header>
        `
    }

    /**Crea el buscador
     * @returns {HTMLElement}
     */
    generarHTMLBuscador() {
        return `
        <nav>
            <label for="buscador">
                Filtro: <input type="text" id="introFiltro" data-vista="buscador" data-elemento="buscador">
                <a href="#" class="btnFiltro" data-vista="buscador" data-accion="filtrar">Filtrar</a>
            </label>
        </nav>
        <div class="mostrarResult"></div>
        `
    }

    /**
     * Genera la tabla de juguetes
     * @param {[]} listaJuguetes 
     * @returns {HTMLElement}
     */
    generarHTMLListadoJuguetes(listaJuguetes) {
        let generarTabla = ``;
        for (let juguete of listaJuguetes) {
            generarTabla += `
            <div class="fila" data-juguete="${juguete.jugueteId}">
                <div data-vista="listado" data-listado="nombre">${juguete.nombre}</div>
                <div data-vista="listado" data-listado="marca">${juguete.marca}</div>
                <div data-vista="listado" data-listado="precio">${juguete.precio}</div>
                <div class="opciones"><a href="#" data-vista="listado" data-accion="borrar">Borrar</a><a href="#" data-vista="listado" data-accion="ver">Ver</a></div>
            </div>`
        }

        return `
        <div class="tabla" data-vista="listado">
            <div class="cabecera">
                <div>Nombre</div>
                <div>Marca</div>
                <div>Precio</div>
                <div><a href="#" data-vista="listado" data-accion="crearJuguete">Crear</a></div>
            </div>
            ${generarTabla}
        </div>
       `
    }

    /**
     * Genero el formulario
     * @returns {HTMLElement}
     */
    generarHTMLFormulario() {
        return `
        <form class="formCrearJuguete" method="post" action="#">
            <h1>AGREGAR NUEVO JUGUETE</h1>
            <label for="introNombre">
                Nombre: <input type="text" name="introNombre" min-length=3 pattern="^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$" required>
            </label>

            <label for="introMarca">
                Marca: <input type="text" name="introMarca" min-length=3 pattern="^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$" required>
            </label>

            <label for="introPrecio">
                Precio: <input type="text" name="introPrecio" pattern="^[0-9]+$" required>
            </label>

            <input type="submit" id="btnAgregar" data-accion="agregar" value="Agregar">

            <div class="mostrarErrores"></div>
        </form>
        `;
    }
}

window.addEventListener("load", function () {
    let j = new Jugueteria();
    const app = document.querySelector('.app');

    j.iniciarApp(app);

    app.addEventListener('click', function (event) {
        event.preventDefault();
        j.asignarEventos();
    });


});





