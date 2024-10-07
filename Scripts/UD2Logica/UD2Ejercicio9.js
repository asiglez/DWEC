'use strict';
function agruparPorTipo(...args) {
    let tipos = {};
    args.forEach((parametro, index) => {
        let tipo = typeof parametro;
        if (!tipos[tipo]) {
            tipos[tipo] = [];
        }

        tipos[tipo].push({ valor: parametro, posicion: index });
    });
    for (let tipo in tipos) {
        console.log(`Tipo: ${tipo}`);
        tipos[tipo].forEach(item => {
            console.log(`  Valor: ${item.valor}, Posición: ${item.posicion}`);
        });
    }
}
agruparPorTipo(42, "texto", true, null, { clave: "valor" }, [1, 2, 3], undefined, 3.14);