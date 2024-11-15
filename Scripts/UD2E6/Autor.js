class Autor {
    constructor(autorId, nombre, nacionalidad, biografia, libros = []) {
        this.autorId = autorId;
        this.nombre = nombre;
        this.nacionalidad = nacionalidad;
        this.biografia = biografia;
        this.libros = libros;
    }

    generarHTMLCreacion() {
        return `
            <form id="form-crear-autor">
                <input type="text" id="nombre" placeholder="Nombre del autor" required>
                <input type="text" id="nacionalidad" placeholder="Nacionalidad del autor" required>
                <input type="text" id="biografia" placeholder="Biografia del autor" required>
                <button type="submit">Crear Autor</button>
            </form>
        `;
    }

    generarHTMLEdicion() {
        return `
            <form id="form-editar-autor" data-id="${this.autorId}">
                <input type="text" id="nombre" value="${this.nombre}" required>
                <input type="text" id="nacionalidad" value="${this.nacionalidad}" required>
                <input type="text" id="biografia" value="${this.biografia}" required>
                <button type="submit">Guardar Cambios</button>
            </form>
        `;
    }

    generarHTMLPropiedades() {
        const librosHTML = this.libros.map((titulo, index) => `
                <li>
                    ${titulo}
                    <button class="biblio-autor-eliminar-libro" data-index="${index}" data-id="${this.autorId}">Eliminar</button>
                </li>`).join('');

        return `
                <div class="autor-detalle">
                    <h3>${this.nombre}</h3>
                    <p>Nacionalidad: ${this.nacionalidad}</p>
                    <p>Biografía: ${this.biografia}</p>
                    <h4>Libros Publicados:</h4>
                    <ul>${librosHTML || '<p>No hay libros publicados.</p>'}</ul>
                    <button class="biblio-autor-editar" data-id="${this.autorId}">Editar</button>
                    <button class="biblio-autor-borrar" data-id="${this.autorId}">Borrar</button>
                    <form id="form-agregar-libro" data-id="${this.autorId}">
                        <input type="text" id="titulo-libro" placeholder="Nuevo libro" required>
                        <button type="submit">Añadir Libro</button>
                    </form>
                </div>
            `;
    }
    
    añadirLibro(titulo) {
        if (titulo && !this.libros.includes(titulo)) {
            this.libros.push(titulo);
            console.log(`Libro "${titulo}" añadido al autor ${this.nombre}.`);
        } else {
            console.log(`El libro "${titulo}" ya existe o es inválido.`);
        }
    }

    eliminarLibro(index) {
        if (index >= 0 && index < this.libros.length) {
            const libroEliminado = this.libros.splice(index, 1);
            console.log(`Libro "${libroEliminado}" eliminado del autor ${this.nombre}.`);
        } else {
            console.log(`Índice de libro inválido para el autor ${this.nombre}.`);
        }
    }
}
export default Autor;