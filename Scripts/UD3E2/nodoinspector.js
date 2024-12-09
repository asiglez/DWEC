export class NodoInspector {
    #nodoActual;

    constructor(nodoInicial) {
        this.#nodoActual = nodoInicial;
    }

    get esRaiz() {
        return this.#nodoActual === document.documentElement;
    }

    get esPrimerHijo() {
        // Verificar que parentNode y firstChild existan antes de compararlos
        return this.#nodoActual.parentNode?.firstChild === this.#nodoActual;
    }

    get esUltimoHijo() {
        // Verificar que parentNode y lastChild existan antes de compararlos
        return this.#nodoActual.parentNode?.lastChild === this.#nodoActual;
    }

    get tieneHijos() {
        // Verificar si existen hijos
        return this.#nodoActual.children?.length > 0;
    }

    obtenerInfo() {
        // Si el nodo es válido, obtenemos la información. Si no, devolvemos valores predeterminados.
        return {
            etiqueta: this.#nodoActual?.tagName || "Sin etiqueta",
            id: this.#nodoActual?.id || "Sin ID",
            clases: this.#nodoActual?.className || "Sin clases",
            texto: this.#nodoActual?.textContent?.trim() || "Sin texto"
        };
    }

    irPadre() {
        const nodoPadre = this.#nodoActual?.parentElement;
        if (nodoPadre) {
            this.#actualizarNodo(nodoPadre);
        } else {
            console.log("No se puede ir al nodo padre, el nodo actual no tiene un padre.");
        }
    }

    irPrimerHijo() {
        const primerHijo = this.#nodoActual?.firstElementChild;
        if (primerHijo) {
            this.#actualizarNodo(primerHijo);
        } else {
            console.log("El nodo actual no tiene primer hijo.");
        }
    }

    irUltimoHijo() {
        const ultimoHijo = this.#nodoActual?.lastElementChild;
        if (ultimoHijo) {
            this.#actualizarNodo(ultimoHijo);
        } else {
            console.log("El nodo actual no tiene último hijo.");
        }
    }

    irAnteriorHermano() {
        const anteriorHermano = this.#nodoActual?.previousElementSibling;
        if (anteriorHermano) {
            this.#actualizarNodo(anteriorHermano);
        } else {
            console.log("El nodo actual no tiene hermano anterior.");
        }
    }

    irSiguienteHermano() {
        const siguienteHermano = this.#nodoActual?.nextElementSibling;
        if (siguienteHermano) {
            this.#actualizarNodo(siguienteHermano);
        } else {
            console.log("El nodo actual no tiene hermano siguiente.");
        }
    }

    #actualizarNodo(nuevoSeleccionado) {
        // Verificar que el nodo no sea undefined ni null antes de continuar
        if (!nuevoSeleccionado) {
            console.error("El nodo proporcionado no es válido");
            return;
        }
    
        // Si ya hay un nodo seleccionado, eliminamos el resaltado
        if (this.#nodoActual) {
            this.#nodoActual.classList.remove("resaltado");
        }
    
        // Actualizamos el nodo actual
        this.#nodoActual = nuevoSeleccionado;
    
        // Verificar que el nodo actual sea válido antes de aplicar el resaltado
        if (this.#nodoActual) {
            this.#nodoActual.classList.add("resaltado");
        }
    }
}