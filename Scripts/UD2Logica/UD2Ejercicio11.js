'use strict';
function verificarNumeros(rangoInicio, rangoFin) {
    if(rangoInicio<=rangoFin){
    for (let i = rangoInicio; i <= rangoFin; i++) {
        let esPrimo = true;
        if (i < 2) esPrimo = false;
        for (let j = 2; j <= Math.sqrt(i); j++) {
            if (i % j === 0) {
                esPrimo = false;
                break;
            }
        }
        let esMultiploDe3 = (i % 3 === 0);
        let esMultiploDe5 = (i % 5 === 0);
        if (esMultiploDe3 || esMultiploDe5 || esPrimo) {
            console.log(`Número: ${i} - Múltiplo de 3: ${esMultiploDe3}, Múltiplo de 5: ${esMultiploDe5}, Primo: ${esPrimo}`);
        }
    }
}else{
    console.log('El numero de inicio es mayor que el numero final');
}
}
let inicio = parseInt(prompt("Introduce el inicio del rango:"));
let fin = parseInt(prompt("Introduce el fin del rango:"));
verificarNumeros(inicio, fin);