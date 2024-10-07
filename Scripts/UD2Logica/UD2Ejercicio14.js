'use strict';
let alumnos = [
    {
        nombre: "Juan",
        asignaturas: [
            { modulo: "DWEC", nota: 8 },
            { modulo: "DIW", nota: 7 },
            { modulo: "DWES", nota: 6 },
        ],
    },
    {
        nombre: "María",
        asignaturas: [
            { modulo: "DWEC", nota: 9 },
            { modulo: "DIW", nota: 9 },
            { modulo: "DWES", nota: 10 },
        ],
    },
    {
        nombre: "Pedro",
        asignaturas: [
            { modulo: "DWEC", nota: 4 },
            { modulo: "DIW", nota: 5 },
            { modulo: "DWES", nota: 3 },
        ],
    },
];
function procesarAlumnos(alumnos) {
    alumnos.forEach(alumno => {
        let notas = alumno.asignaturas.map(asig => asig.nota);
        let media = notas.reduce((a, b) => a + b, 0) / notas.length;
        let promociona = notas.every(nota => nota >= 5); // Verificar si todas las asignaturas están aprobadas

        alumno.promociona = promociona;
        alumno.media = media;
    });
}
function imprimirAlumnosPromocionan(alumnos) {
    console.log("Alumnos que promocionan:");
    alumnos.forEach((alumno, index) => {
        if (alumno.promociona) {
            console.log(`${index} - ${alumno.nombre} - ${alumno.media.toFixed(2)}`);
        }
    });
}
function imprimirAlumnosNoPromocionan(alumnos) {
    console.log("Alumnos que no promocionan:");
    alumnos.forEach((alumno, index) => {
        if (!alumno.promociona) {
            let pendientes = alumno.asignaturas.filter(asig => asig.nota < 5).map(asig => asig.modulo);
            console.log(`${index} - ${alumno.nombre} - Pendientes: [${pendientes.join(', ')}]`);
        }
    });
}
procesarAlumnos(alumnos);
imprimirAlumnosPromocionan(alumnos);
imprimirAlumnosNoPromocionan(alumnos);