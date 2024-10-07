'use strict';
function contarCaracteres(cadena) {
    let contador = {};
    for (let char of cadena) {
        contador[char] = (contador[char] || 0) + 1;
    }
    return contador;
}
let texto = prompt("Introduce una cadena de texto:");
let resultadoContador = contarCaracteres(texto);
console.log(resultadoContador);