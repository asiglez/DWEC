let numeros = [];
let input;
// Solicitar números al usuario hasta que introduzca 0
do {
  input = parseFloat(prompt("Introduce un número:"));
  if (input !== 0) {
    numeros.push(input);
  }
} while (input !== 0);

// Si no se introdujeron números, mostrar un mensaje
if (numeros.length === 0) {
  console.log("No has introducido ningún número.");
} else {
  let maximo = Math.max(...numeros);
  let minimo = Math.min(...numeros);
  let suma = numeros.reduce((acc, num) => acc + num, 0);
  let media = suma / numeros.length;
  let totalNumeros = numeros.length;

  console.log(`Máximo: ${maximo}`);
  console.log(`Mínimo: ${minimo}`);
  console.log(`Suma: ${suma}`);
  console.log(`Media: ${media}`);
  console.log(`Total de números introducidos: ${totalNumeros}`);
}