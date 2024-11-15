class Libro {
    constructor(libroId, titulo, ISBN, autorId, bibliotecaId, prestamos = []) {
        this.libroId = libroId;
        this.titulo = titulo;
        this.ISBN = ISBN;
        this.autorId = autorId;
        this.bibliotecaId = bibliotecaId;
        this.prestamos = prestamos;
    }

    get estaDisponible() {
        return this.prestamos.every(prestamo => prestamo.fechaDevolucion);
    }

    generarHTMLCreacion() {
        return `
            <form id="form-crear-libro">
                <input type="text" id="titulo" placeholder="Título del libro" required>
                <input type="text" id="ISBN" placeholder="ISBN" required>
                <input type="number" id="autorId" placeholder="ID del Autor" required>
                <input type="number" id="bibliotecaId" placeholder="ID de la Biblioteca" required>
                <button type="submit">Crear Libro</button>
            </form>
        `;
    }

    generarHTMLEdicion() {
        return `
            <form id="form-editar-libro" data-id="${this.libroId}">
                <input type="text" id="titulo" value="${this.titulo}" required>
                <input type="text" id="ISBN" value="${this.ISBN}" required>
                <input type="number" id="autorId" value="${this.autorId}" required>
                <input type="number" id="bibliotecaId" value="${this.bibliotecaId}" required>
                <button type="submit">Guardar Cambios</button>
            </form>
        `;
    }

    generarHTMLPropiedades() {
        return `
            <div class="libro-detalle">
                <h3>${this.titulo}</h3>
                <p>ISBN: ${this.ISBN}</p>
                <p>Autor ID: ${this.autorId}</p>
                <p>Biblioteca ID: ${this.bibliotecaId}</p>
                <p>Estado: ${this.estaDisponible ? 'Disponible' : 'Prestado'}</p>
                <button class="biblio-libro-editar" data-id="${this.libroId}">Editar</button>
                <button class="biblio-libro-borrar" data-id="${this.libroId}">Borrar</button>
                <button class="biblio-libro-prestar" data-id="${this.libroId}" ${!this.estaDisponible ? 'disabled' : ''}>Prestar</button>
                <button class="biblio-libro-devolver" data-id="${this.libroId}" ${this.estaDisponible ? 'disabled' : ''}>Devolver</button>
                <h4>Historial de Préstamos:</h4>
                ${this.generarHTMLListadoPrestamos()}
            </div>
        `;
    }

    generarHTMLListadoPrestamos() {
        if (this.prestamos.length === 0) {
            return `<p>No hay préstamos registrados.</p>`;
        }

        return `
            <ul>
                ${this.prestamos.map(prestamo => `
                    <li>Prestado el: ${prestamo.fechaPrestamo} - ${prestamo.fechaDevolucion ? `Devuelto el: ${prestamo.fechaDevolucion}` : 'No devuelto'}</li>
                `).join('')}
            </ul>
        `;
    }

    crearPrestamo() {
        if (this.estaDisponible) {
            const fechaActual = new Date().toISOString().split('T')[0]; // Fecha en formato YYYY-MM-DD
            this.prestamos.push({ fechaPrestamo: fechaActual, fechaDevolucion: null });
            console.log(`El libro "${this.titulo}" ha sido prestado.`);
        } else {
            console.log(`El libro "${this.titulo}" no está disponible para préstamo.`);
        }
    }

    devolverPrestamo() {
        const prestamoActivo = this.prestamos.find(prestamo => !prestamo.fechaDevolucion);
        if (prestamoActivo) {
            prestamoActivo.fechaDevolucion = new Date().toISOString().split('T')[0];
            console.log(`El libro "${this.titulo}" ha sido devuelto.`);
        } else {
            console.log(`No hay préstamos activos para el libro "${this.titulo}".`);
        }
    }
}
export default Libro;