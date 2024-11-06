'use strict';
function Animal(nombre) {
    this.tipo = 'animal';
    this.nombre = nombre;
}
Animal.prototype.comer = function () {
    return `${this.nombre} está comiendo`;
}
Animal.prototype.dormir = function () {
    return `${this.nombre} está durmiendo`;
}
Animal.prototype.hacerRuido = function () {
    if (this.tipo === 'animal') {
        return `${this.nombre} hace ruido`;
    }
    if (this.tipo === 'perro' || this.tipo === 'Perro') {
        return `${this.nombre} hace guau`;
    }
    if (this.tipo === 'gato' || this.tipo === 'Gato') {
        return `${this.nombre} hace miau`;
    }
}
function Gato(nombre) {
    Animal.call(this, nombre);
    this.tipo = 'gato';
}
Gato.prototype.__proto__ = Animal.prototype;
function Perro(nombre) {
    Animal.call(this, nombre);
    this.tipo = 'perro';
}
Perro.prototype.__proto__ = Animal.prototype
let Nash = new Perro('Nash')
let Nico = new Gato('Nico');
console.log(Nash.comer());
console.log(Nash.dormir());
console.log(Nash.hacerRuido());
console.log(Nico.comer());
console.log(Nico.dormir());
console.log(Nico.hacerRuido());