import * as validaciones from "./Aplicacion.js";

validaciones.validarNombre("A231", function (valido, invalido){
    if (valido) {
        console.log(valido);
        return;
    }else{
        console.error(invalido);
    } 
});