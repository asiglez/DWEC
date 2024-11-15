import Libro from "./Libro.js";
import Autor from "./Autor.js";
import Biblioteca from "./Biblioteca.js";
import datos from "./datos.js";
const $biblio = (() => {
    let coleccionLibros = datos.libros.map(libro => new Libro(libro.libroId, libro.titulo, libro.ISBN, libro.autorId, libro.bibliotecaId, libro.prestamos));
    let coleccionAutores = datos.autores.map(autor => new Autor(autor.autorId, autor.nombre, autor.nacionalidad, autor.biografia, autor.libros));
    let coleccionBibliotecas = datos.bibliotecas.map(biblioteca => new Biblioteca(biblioteca.bibliotecaId, biblioteca.nombre, biblioteca.ubicacion));

    const gestionDeDatos = function () {
        return { coleccionLibros, coleccionAutores, coleccionBibliotecas };
    };

    const generarHTMLListadoAutores = function () {
        return coleccionAutores.map(autor => autor.generarHTMLPropiedades()).join('');
    }

    const generarHTMLListadoBibliotecas = function () {
        return coleccionBibliotecas.map(biblioteca => biblioteca.generarHTMLPropiedades()).join('');
    }

    const generarHTMLListadoLibros = function () {
        return coleccionLibros.map(libro => libro.generarHTMLPropiedades()).join('');
    }

    const buscarLibrosPorTitulo = function (titulo) {
        return coleccionLibros.filter(libro => libro.titulo.toLowerCase().includes(titulo.toLowerCase()));
    };

    const buscarLibrosPorAutor = function (autorId) {
        return coleccionLibros.filter(libro => libro.autorId === autorId);
    };

    const buscarLibro = function (libroId) {
        return coleccionLibros.find(libro => libro.libroId === libroId);
    };

    const buscarAutor = function (autorId) {
        return coleccionAutores.find(autor => autor.autorId === autorId);
    };

    const buscarBiblioteca = function (bibliotecaId) {
        return coleccionBibliotecas.find(biblioteca => biblioteca.bibliotecaId === bibliotecaId);
    };

    const crearLibro = function (libroData) {
        const nuevoLibro = new Libro(libroData.libroId, libroData.titulo, libroData.ISBN, libroData.autorId, libroData.bibliotecaId, libroData.prestamos);
        coleccionLibros.push(nuevoLibro);
    };

    const crearAutor = function (autorData) {
        const nuevoAutor = new Autor(autorData.autorId, autorData.nombre, autorData.nacionalidad, autorData.biografia, autorData.libros);
        coleccionAutores.push(nuevoAutor);
    };

    const crearBiblioteca = function (bibliotecaData) {
        const nuevaBiblioteca = new Biblioteca(bibliotecaData.bibliotecaId, bibliotecaData.nombre, bibliotecaData.ubicacion);
        coleccionBibliotecas.push(nuevaBiblioteca);
    };

    const borrarLibro = function (libroId) {
        coleccionLibros = coleccionLibros.filter(libro => libro.libroId !== libroId);
    };

    const borrarAutor = function (autorId) {
        coleccionAutores = coleccionAutores.filter(autor => autor.autorId !== autorId);
    };

    const borrarBiblioteca = function (bibliotecaId) {
        coleccionBibliotecas = coleccionBibliotecas.filter(biblioteca => biblioteca.bibliotecaId !== bibliotecaId);
    };

    const crearPrestamo = function (libroId) {
        const libro = buscarLibro(libroId);
        if (libro && libro.estaDisponible()) {
            libro.crearPrestamo();
        } else {
            console.log(`El libro no está disponible para préstamo.`);
        }
    };

    const devolverPrestamo = function (libroId) {
        const libro = buscarLibro(libroId);
        if (libro && !libro.estaDisponible()) {
            libro.devolverPrestamo();
        } else {
            console.log(`El libro no está actualmente prestado.`);
        }
    };

    return {
        generarHTMLListadoAutores,
        generarHTMLListadoBibliotecas,
        generarHTMLListadoLibros,
        buscarLibrosPorTitulo,
        buscarLibrosPorAutor,
        buscarLibro,
        buscarAutor,
        buscarBiblioteca,
        crearLibro,
        crearAutor,
        crearBiblioteca,
        borrarLibro,
        borrarAutor,
        borrarBiblioteca,
        crearPrestamo,
        devolverPrestamo,
    };
})();

export default $biblio;
