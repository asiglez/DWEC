let poligono=parseInt(prompt('Que poligono quieres dibujar:\n'+'1- Cuadrado\n'+'2- Triangulo\n'+'3- Rombo'));
let n;
function pintarCuadrado(n){
    let resultado=[];
    for(let f=0;f<n;f++){
        let fila=[];
        resultado[f]=fila;
        for(let c=0;c<n;c++){
            fila[c];
            if(c===0 || c===n-1 || f===0 ||f===n-1){
                fila[c]='*';
            }else{
                fila[c]=' ';
            }
        }
    }
    return resultado;
}
function pintarTriangulo(n){
    let resultado=[];
    let t=parseInt(n)+parseInt(n) - 1;
    for(let f=0;f<n;f++){
        let fila=[];
        resultado[f]=fila;
        for(let c=0;c<t;c++){
            if(f===n-1 || c===t-n-f || c===t-(n-f)){
            fila[c]='*';
            }else{
                fila[c]=' ';
            }
        }
    }
    return resultado;
}
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
switch (poligono){
    case 1:
        n=prompt('Introduce el tamaño');
        alert(pintarCuadrado(n));
        break;
    case 2:
        n=prompt('Introduce el tamaño');
        alert(pintarTriangulo(n));
        break;
    case 3:
        n=prompt('Introduce el tamaño');
        alert(pintarRombo(n));
        break;
    default:
        alert('No es una opción');
        break;
}