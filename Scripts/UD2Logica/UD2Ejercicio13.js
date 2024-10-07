'use strict';
function juegoMatematicas() {
    let preguntas = [];
    let continuar = true;
    while (continuar) {
        for (let i = 0; i < 4; i++) {
            let num1 = Math.floor(Math.random() * 10) + 1;
            let num2 = Math.floor(Math.random() * 10) + 1;
            let operadores = ['+', '-', '*', '/'];
            let operador = operadores[Math.floor(Math.random() * operadores.length)];
            let resultadoCorrecto;
            switch (operador) {
                case '+':
                    resultadoCorrecto = num1 + num2;
                    break;
                case '-':
                    resultadoCorrecto = num1 - num2;
                    break;
                case '*':
                    resultadoCorrecto = num1 * num2;
                    break;
                case '/':
                    resultadoCorrecto = (num1 / num2).toFixed(2);
                    break;
            }
            let respuestaUsuario = prompt(`¿Cuánto es ${num1} ${operador} ${num2}?`);
            let acierto = respuestaUsuario == resultadoCorrecto;
            preguntas.push({ pregunta: `${num1} ${operador} ${num2}`, respuesta: respuestaUsuario, acierto: acierto });
        }
        continuar = confirm("¿Deseas continuar jugando?");
    }
    console.log("Resumen de preguntas:");
    let totalAcertadas = 0;
    let totalFalladas = 0;
    preguntas.forEach((item, index) => {
        console.log(`${index + 1}: Pregunta: ${item.pregunta} - Tu respuesta: ${item.respuesta} - ${item.acierto ? "Correcto" : "Incorrecto"}`);
        if (item.acierto) totalAcertadas++;
        else totalFalladas++;
    });
    console.log(`Total de acertadas: ${totalAcertadas}`);
    console.log(`Total de falladas: ${totalFalladas}`);
}
juegoMatematicas();