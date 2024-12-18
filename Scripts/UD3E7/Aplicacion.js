import { ValidacionError } from "./ValidacionError.js";

export function validarNombre(nombre, callback) {
    let numeros = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    if (nombre.length < 3 || numeros.includes(nombre.split(""))) {
        return callback(null, new ValidacionError("El nombre debe tener al menos 3 caracteres y no contener números.", "nombre"));
    }
    callback(nombre, null);
}

export function validarContraseña(contraseña, callback) {
    let mayusculas = ["A", "Á", "B", "C", "D", "E", "É", "F", "G", "H", "I", "Í", "J", "K", "L", "M", "N", "Ñ", "O", "Ó", "P", "Q", "R", "S", "T", "U", "Ú", "V", "W", "X", "Y", "Z"];
    let minisculas = ["a", "á", "b", "c", "d", "e", "é", "f", "g", "h", "i", "í", "j", "k", "l", "m", "n", "ñ", "o", "ó", "p", "q", "r", "s", "t", "u", "ú", "v", "w", "x", "y", "z"];
    let numeros = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    if (contraseña.length < 8 || !mayusculas.includes(contraseña.split("") || !minisculas.includes(contraseña.split("")) || !numeros.includes(contraseña.split("")))) {
        return callback(null, new ValidacionError("La contraseña debe incluir al menos una mayúscula, una minúscula, un número y tener una longitud mínima de 8 carecteres", "contraseña"));
    }
    callback(contraseña, null);
}

export function validarEmail(email, callback) {
    let arroba = email.indexOf("@");
    let divisionarroba = email.split("@");
    let divisionpunto = divisionarroba[1].split(".");
    if (arroba < 1 || arroba > 1 || divisionarroba[0].length==0 || divisionpunto[0].length==0 || divisionpunto[1].length<2 || divisionpunto[1].length>3) {
        return callback(null, new ValidacionError("El email debe contener una única @, texto antes y después de la @, y terminar con un punto seguido de 2 o 3 letras.", "email"));
    }
    callback(email, null);
}

export function validarFecha(fecha, callback) {
    if (fecha < 18 || fecha > 25) {
        return callback(null, new ValidacionError("Tienes que tener entre 18 y 24 años", "fecha de nacimiento"));
    }
    callback(fecha, null);
}
