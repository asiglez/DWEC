'use strict';
let trabajadores = [];
function generarCodigo() {
    const codigo = `E${String(trabajadores.length + 1).padStart(2, '0')}`;
    return codigo;
}
function crearTrabajador(nombre, categoria, contratacion) {
    const codigo = generarCodigo();
    const trabajador = {
        codigo: codigo,
        nombre: nombre,
        categoria: categoria,
        contratacion: contratacion,
        calcularNomina: function () {
            const salariosBase = { 1: 1100, 2: 1400, 3: 1900 };
            const antiguedad = new Date().getFullYear() - this.contratacion;
            return salariosBase[this.categoria] * (1 + 0.04 * antiguedad);
        }
    };
    trabajadores.push(trabajador);
    console.log(`Trabajador ${nombre} creado con código: ${codigo}`);
}
function listarTrabajadores() {
    if (trabajadores.length === 0) {
        console.log("No hay trabajadores registrados.");
    } else {
        console.log("Lista de trabajadores:");
        trabajadores.forEach((trabajador, index) => {
            console.log(`${index + 1}. Código: ${trabajador.codigo}, Nombre: ${trabajador.nombre}, Categoría: ${trabajador.categoria}, Contratación: ${trabajador.contratacion}`);
        });
    }
}
function borrarTrabajador(codigo) {
    const index = trabajadores.findIndex(trabajador => trabajador.codigo === codigo);
    if (index !== -1) {
        const confirmacion = confirm(`¿Seguro que deseas eliminar al trabajador con código ${codigo}?`);
        if (confirmacion) {
            trabajadores.splice(index, 1);
            console.log(`Trabajador con código ${codigo} eliminado.`);
        }
    } else {
        console.log(`No se encontró ningún trabajador con código ${codigo}.`);
    }
}
function modificarTrabajador(codigo) {
    const trabajador = trabajadores.find(t => t.codigo === codigo);
    if (trabajador) {
        const nuevoNombre = prompt(`Introduce el nuevo nombre (actual: ${trabajador.nombre})`) || trabajador.nombre;
        const nuevaCategoria = prompt(`Introduce la nueva categoría (1, 2, 3) (actual: ${trabajador.categoria})`) || trabajador.categoria;
        const nuevaContratacion = prompt(`Introduce el nuevo año de contratación (actual: ${trabajador.contratacion})`) || trabajador.contratacion;

        trabajador.nombre = nuevoNombre;
        trabajador.categoria = parseInt(nuevaCategoria);
        trabajador.contratacion = parseInt(nuevaContratacion);

        console.log(`Trabajador con código ${codigo} modificado.`);
    } else {
        console.log(`No se encontró ningún trabajador con código ${codigo}.`);
    }
}
function calcularNominas() {
    const resumenCategorias = { 1: 0, 2: 0, 3: 0 };
    let totalNominas = 0;

    trabajadores.forEach(trabajador => {
        const nomina = trabajador.calcularNomina();
        totalNominas += nomina;
        resumenCategorias[trabajador.categoria] += nomina;
        console.log(`Trabajador: ${trabajador.nombre} - Categoría: ${trabajador.categoria} - Nómina: ${nomina.toFixed(2)}€`);
    });

    console.log("\nResumen por categorías:");
    for (const [categoria, total] of Object.entries(resumenCategorias)) {
        console.log(`Categoría ${categoria}: Total = ${total.toFixed(2)}€`);
    }
    console.log(`Total de nóminas de la empresa: ${totalNominas.toFixed(2)}€`);
}
function mostrarMenu() {
    let salir = false;

    while (!salir) {
        const opcion = prompt(
            `Menú:
1. Crear trabajador
2. Listar trabajadores
3. Modificar trabajador
4. Borrar trabajador
5. Calcular nóminas
6. Salir
Elige una opción:`
        );

        switch (opcion) {
            case '1':
                const nombre = prompt("Introduce el nombre del trabajador:");
                const categoria = prompt("Introduce la categoría (1, 2 o 3):");
                const contratacion = prompt("Introduce el año de contratación:");
                crearTrabajador(nombre, parseInt(categoria), parseInt(contratacion));
                break;
            case '2':
                listarTrabajadores();
                break;
            case '3':
                const codigoMod = prompt("Introduce el código del trabajador a modificar:");
                modificarTrabajador(codigoMod);
                break;
            case '4':
                const codigoBor = prompt("Introduce el código del trabajador a borrar:");
                borrarTrabajador(codigoBor);
                break;
            case '5':
                calcularNominas();
                break;
            case '6':
                salir = true;
                console.log("Saliendo del programa...");
                break;
            default:
                console.log("Opción no válida. Inténtalo de nuevo.");
                break;
        }
    }
}
mostrarMenu();