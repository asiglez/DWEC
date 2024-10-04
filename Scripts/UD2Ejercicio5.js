function pintarRombo(n) { 
    let resultado = [];
    let t = n; // Altura del rombo

    // Llenar la matriz
    for (let f = 0; f < t; f++) {
        let fila = [];
        resultado[f] = fila;

        // Inicializar la fila con espacios
        for (let c = 0; c < t * 2 - 1; c++) {
            fila[c] = ' ';
        }

        // Calcular la posición del primer y último asterisco
        const inicio = t - 1 - f; // Primera posición del asterisco
        const fin = t - 1 + f; // Última posición del asterisco

        // Rellenar la fila con asteriscos
        for (let c = inicio; c <= fin; c++) {
            fila[c] = '*'; // Asigna un asterisco
        }
    }

    // Construir la parte inferior del rombo
    for (let f = t - 2; f >= 0; f--) {
        let fila = [];
        resultado.push(fila);

        // Inicializar la fila con espacios
        for (let c = 0; c < t * 2 - 1; c++) {
            fila[c] = ' ';
        }

        // Calcular la posición del primer y último asterisco
        const inicio = t - 1 - f; // Primera posición del asterisco
        const fin = t - 1 + f; // Última posición del asterisco

        // Rellenar la fila con asteriscos
        for (let c = inicio; c <= fin; c++) {
            fila[c] = '*'; // Asigna un asterisco
        }
    }

    return resultado;
}
let resultado=pintarRombo(prompt('Introduce el tamaño'));
for(let index in resultado){
console.log(resultado[index]);
}