let coleccionLibros = datos.libros.map(libro => new Libro(libro.libroId, libro.titulo, libro.ISBN, libro.autorId, libro.bibliotecaId, libro.prestamos));
    let coleccionAutores = datos.autores.map(autor => new Autor(autor.autorId, autor.nombre, autor.nacionalidad, autor.biografia, autor.libros));
    let coleccionBibliotecas = datos.bibliotecas.map(biblioteca => new Biblioteca(biblioteca.bibliotecaId, biblioteca.nombre, biblioteca.ubicacion));

    const generarHTMLListadoAutores = () => {
        return coleccionAutores.map(autor => autor.generarHTMLPropiedades()).join('');
    };

    const generarHTMLListadoBibliotecas = () => {
        return coleccionBibliotecas.map(biblioteca => biblioteca.generarHTMLPropiedades()).join('');
    };

    const generarHTMLListadoLibros = () => {
        return coleccionLibros.map(libro => libro.generarHTMLPropiedades()).join('');
    };

    const buscarLibrosPorTitulo = (titulo) => {
        return coleccionLibros.filter(libro => libro.titulo.toLowerCase().includes(titulo.toLowerCase()));
    };

    const buscarLibrosPorAutor = (autorId) => {
        return coleccionLibros.filter(libro => libro.autorId === autorId);
    };

    const buscarLibro = (libroId) => {
        return coleccionLibros.find(libro => libro.libroId === libroId);
    };

    const buscarAutor = (autorId) => {
        return coleccionAutores.find(autor => autor.autorId === autorId);
    };

    const buscarBiblioteca = (bibliotecaId) => {
        return coleccionBibliotecas.find(biblioteca => biblioteca.bibliotecaId === bibliotecaId);
    };

    const crearLibro = (libroData) => {
        const nuevoLibro = new Libro(libroData.libroId, libroData.titulo, libroData.ISBN, libroData.autorId, libroData.bibliotecaId, libroData.prestamos);
        coleccionLibros.push(nuevoLibro);
    };

    const crearAutor = (autorData) => {
        const nuevoAutor = new Autor(autorData.autorId, autorData.nombre, autorData.nacionalidad, autorData.biografia, autorData.libros);
        coleccionAutores.push(nuevoAutor);
    };

    const crearBiblioteca = (bibliotecaData) => {
        const nuevaBiblioteca = new Biblioteca(bibliotecaData.bibliotecaId, bibliotecaData.nombre, bibliotecaData.ubicacion);
        coleccionBibliotecas.push(nuevaBiblioteca);
    };

    const borrarLibro = (libroId) => {
        coleccionLibros = coleccionLibros.filter(libro => libro.libroId !== libroId);
    };

    const borrarAutor = (autorId) => {
        coleccionAutores = coleccionAutores.filter(autor => autor.autorId !== autorId);
    };

    const borrarBiblioteca = (bibliotecaId) => {
        coleccionBibliotecas = coleccionBibliotecas.filter(biblioteca => biblioteca.bibliotecaId !== bibliotecaId);
    };

    const crearPrestamo = (libroId) => {
        const libro = buscarLibro(libroId);
        if (libro && libro.estaDisponible()) {
            libro.crearPrestamo();
        } else {
            console.log(`El libro no está disponible para préstamo.`);
        }
    };

    const devolverPrestamo = (libroId) => {
        const libro = buscarLibro(libroId);
        if (libro && !libro.estaDisponible()) {
            libro.devolverPrestamo();
        } else {
            console.log(`El libro no está actualmente prestado.`);
        }
    };

    const gestionDeDatos = () => {
        return { coleccionLibros, coleccionAutores, coleccionBibliotecas };
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