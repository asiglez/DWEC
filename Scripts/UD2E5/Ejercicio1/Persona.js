'use strict';
class Persona1 {
    constructor(nombre, nacimiento, hobbies) {
        this.nombre = nombre;
        this.nacimiento = new Date(nacimiento);
        this.hobbies = hobbies;
        this.actual = new Date();
    }
    get edad() {
        return parseInt((this.actual - this.nacimiento) / (1000 * 60 * 60 * 24 * 365));
    }
    saludar() {
        return `Hola, me llamo ${this.nombre} y me gusta ${this.hobbies}`;
    }
}
function Persona2(nombre, nacimiento, hobbies) {
    this.nombre = nombre;
    this.nacimiento = new Date(nacimiento);
    this.hobbies = hobbies;
    this.actual = new Date();
    this.saludar = function () {
        return `Hola, me llamo ${this.nombre} y me gusta ${this.hobbies}`;
    };
}
Persona2.prototype.edad= function(){
    return parseInt((this.actual - this.nacimiento) / (1000 * 60 * 60 * 24 * 365));
}
let actual=new Date();
const Persona3 = {
    nombre: 'Juan',
    nacimiento: new Date('2004-08-22'),
    hobbies: ['Saltar'],
    edad: function () {
        return parseInt((actual - this.nacimiento) / (1000 * 60 * 60 * 24 * 365));
    },
    saludar: function () {
        return `Hola, me llamo ${this.nombre} y me gusta ${this.hobbies}`;
    }
}
let Asier = new Persona1('Asier', '2001-08-22', ['Pintar', 'Dibujar'])
let Alberto= new Persona2('Alberto', '2002-12-22', ['Colorear']);
console.log(Asier.edad);
console.log(Asier.saludar());
console.log(Alberto.edad());
console.log(Alberto.saludar());
console.log(Persona3.edad());
console.log(Persona3.saludar());