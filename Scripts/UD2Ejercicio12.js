function juegoAdivinaNumero() {
    let numeroSecreto = Math.floor(Math.random() * 100) + 1; // Número aleatorio entre 1 y 100
    let intentos = 5;
    let acierto = false;

    while (intentos > 0 && !acierto) {
        let intento = parseInt(prompt("Adivina el número entre 1 y 100:"));
        
        if (intento === numeroSecreto) {
            acierto = true;
            console.log("¡Has adivinado el número!");
        } else if (intento < numeroSecreto) {
            console.log("El número es mayor.");
        } else {
            console.log("El número es menor.");
        }
        intentos--;
    }

    if (!acierto) {
        console.log(`Has perdido. El número secreto era: ${numeroSecreto}`);
    }
}

// Código auxiliar para probar la aplicación
juegoAdivinaNumero();