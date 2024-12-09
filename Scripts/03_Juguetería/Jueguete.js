'use strict'

class Juguete{
    #juegueteId
    #nombre
    #marca
    #precio

    constructor(jugueteId,nombre,marca,precio){
        this.#juegueteId=jugueteId;
        this.#nombre=nombre;
        this.#marca=marca;
        this.#precio=precio;
    }

    get jugueteId(){
        return this.#juegueteId;
    }

    get nombre(){
        return this.#nombre;
    }

    get marca(){
        return this.#marca;
    }

    get precio(){
        return this.#precio;
    }
    set nombre(nombre){
        return this.nombre=nombre;
    }

    set marca(marca){
        return this.#marca=marca;
    }

    set precio(precio){
        return this.#precio=precio;
    }

    /**Devuelve un html con la vista propiedades */
    generarHTMLPropiedades(){
        return `
        <section class="propiedades" data-elemento="propiedades">
            <h1>Propiedades del juguete</h1>
            <p>Nombre: ${this.nombre}</p>
            <p>Marca: ${this.marca}</p>
            <p>Precio: ${this.precio}</p>
        </section>
        `;
    }
}
export {Juguete};