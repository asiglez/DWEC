(function() {
    let trabajadores = [];

    function crearTrabajador(nombre, categoria, contratacion) {
        let codigo = `E${String(trabajadores.length + 1).padStart(2, '0')}`; // Generar código único
        let trabajador = {
            codigo: codigo,
            nombre: nombre,
            categoria: categoria,
            contratacion: contratacion,
            calcularNomina: function() {
                let salarios = { 1: 1100, 2: 1400, 3: 1900 };
                let antiguedad = new Date().getFullYear() - this.contratacion;
                return salarios[this.categoria] * (1 + 0.04 * antiguedad); // Calcular nómina
            },
        };
        trabajadores.push(trabajador);
    }

    function listarTrabajadores() {
        console.log("Lista de trabajadores:");
        trabajadores.forEach(trabajador => {
            console.log(`${trabajador.codigo} - ${trabajador.nombre} - Categoría: ${trabajador.categoria} - Contratación: ${trabajador.contratacion}`);
        });
    }

    function calcularNominas() {
        let resumen = {};
        let totalNominas = 0;

        trabajadores.forEach(trabajador => {
            let nomina = trabajador.calcularNomina();
            totalNominas += nomina;
            if (!resumen[trabajador.categoria]) {
                resumen[trabajador.categoria] = { total: 0, cantidad: 0 };
            }
            resumen[trabajador.categoria].total += nomina;
            resumen[trabajador.categoria].cantidad++;
        });

        console.log("Resumen de nóminas por categoría:");
        for (let categoria in resumen) {
            console.log(`Categoría ${categoria}: Total = ${resumen[categoria].total.toFixed(2)}€, Cantidad = ${resumen[categoria].cantidad}`);
        }
        console.log(`Total de nóminas de la empresa: ${totalNominas.toFixed(2)}€`);
    }

    // Código auxiliar para probar la aplicación
    crearTrabajador("Juan Pérez", 1, 2020);
    crearTrabajador("Ana García", 2, 2019);
    crearTrabajador("Luis Fernández", 3, 2018);
    listarTrabajadores();
    calcularNominas();
})();