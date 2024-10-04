function contarCaracteres(cadena) {
    let contador = {};
    for (let char of cadena) {
        contador[char] = (contador[char] || 0) + 1; // Incrementar contador para cada carácter
    }
    return contador;
}

// Código auxiliar para probar la aplicación
let texto = prompt("Introduce una cadena de texto:");
let resultadoContador = contarCaracteres(texto);
console.log(resultadoContador);