class Biblioteca {
    constructor(bibliotecaId, nombre, ubicacion, libros = []) {
        this.bibliotecaId = bibliotecaId;
        this.nombre = nombre;
        this.ubicacion = ubicacion;
        this.libros = libros;
    }

    generarHTMLCreacion() {
        return `
        <form id="form-crear-biblioteca">
            <input type="text" id="nombre-biblioteca" placeholder="Nombre de la biblioteca" required>
            <input type="text" id="ubicacion-biblioteca" placeholder="Ubicación" required>
            <button type="submit">Crear Biblioteca</button>
        </form>
    `;
    }

    generarHTMLEdicion() {
        return `
        <form id="form-editar-biblioteca" data-id="${this.bibliotecaId}">
            <input type="text" id="nombre-biblioteca" value="${this.nombre}" required>
            <input type="text" id="ubicacion-biblioteca" value="${this.ubicacion}" required>
            <button type="submit">Guardar Cambios</button>
        </form>
    `;
    }

    generarHTMLPropiedades() {
        const librosHTML = this.libros.map(libro => `
        <li>
            ${libro.titulo} (ID: ${libro.libroId})
            <button class="biblio-biblioteca-eliminar-libro" data-libro-id="${libro.libroId}" data-id="${this.bibliotecaId}">Eliminar</button>
        </li>
    `).join('');

        return `
        <div class="biblioteca-detalle">
            <h3>${this.nombre}</h3>
            <p>Ubicación: ${this.ubicacion}</p>
            <h4>Libros en la biblioteca:</h4>
            <ul>${librosHTML || '<p>No hay libros asignados.</p>'}</ul>
            <button class="biblio-biblioteca-editar" data-id="${this.bibliotecaId}">Editar</button>
            <button class="biblio-biblioteca-borrar" data-id="${this.bibliotecaId}">Borrar</button>
            <form id="form-agregar-libro-biblioteca" data-id="${this.bibliotecaId}">
                <input type="number" id="libro-id" placeholder="ID del libro" required>
                <button type="submit">Añadir Libro</button>
            </form>
        </div>
    `;
    }

    añadirLibro(libro) {
        if (libro && !this.libros.some(l => l.libroId === libro.libroId)) {
            this.libros.push(libro);
            console.log(`Libro "${libro.titulo}" añadido a la biblioteca ${this.nombre}.`);
        } else {
            console.log(`El libro ya está en la biblioteca o no es válido.`);
        }
    }

    eliminarLibro(libroId) {
        const index = this.libros.findIndex(libro => libro.libroId === libroId);
        if (index !== -1) {
            const libroEliminado = this.libros.splice(index, 1);
            console.log(`Libro "${libroEliminado[0].titulo}" eliminado de la biblioteca ${this.nombre}.`);
        } else {
            console.log(`Libro con ID ${libroId} no encontrado en la biblioteca.`);
        }
    }
}

export default Biblioteca;