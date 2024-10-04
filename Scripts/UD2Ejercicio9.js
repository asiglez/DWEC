function agruparPorTipo(...args) {
    let tipos = {};

    // Iterar sobre los argumentos
    args.forEach((parametro, index) => {
        let tipo = typeof parametro; // Obtener el tipo del parámetro

        // Si el tipo no existe en el objeto, inicializarlo
        if (!tipos[tipo]) {
            tipos[tipo] = [];
        }

        // Agregar el parámetro y su posición
        tipos[tipo].push({ valor: parametro, posicion: index });
    });

    // Mostrar los resultados
    for (let tipo in tipos) {
        console.log(`Tipo: ${tipo}`);
        tipos[tipo].forEach(item => {
            console.log(`  Valor: ${item.valor}, Posición: ${item.posicion}`);
        });
    }
}

// Código auxiliar para probar la aplicación
agruparPorTipo(42, "texto", true, null, { clave: "valor" }, [1, 2, 3], undefined, 3.14);