'use strict';
function Animal1(tipo = 'animal', nombre) {
    this.tipo = tipo;
    this.nombre = nombre;
    this.comer = function () {
        return `${this.nombre} está comiendo`;
    }
    this.dormir = function () {
        return `${this.nombre} está durmiendo`;
    }
    this.hacerRuido = function () {
        if (this.tipo === 'animal') {
            return `${this.nombre} hace ruido`;
        }
        if (this.tipo === 'perro'|| this.tipo === 'Perro') {
            return `${this.nombre} hace guau`;
        }
        if (this.tipo === 'gato'|| this.tipo === 'Gato') {
            return `${this.nombre} hace miau`;
        }
    }
}
class Animal2 {
    constructor(tipo = 'animal', nombre) {
        this.tipo = tipo;
        this.nombre = nombre;
    }
    comer() {
        return `${this.nombre} está comiendo`;
    }
    dormir() {
        return `${this.nombre} está durmiendo`;
    }
    hacerRuido() {
        if (this.tipo === 'animal') {
            return `${this.nombre} hace ruido`;
        }
        if (this.tipo === 'perro'|| this.tipo === 'Perro') {
            return `${this.nombre} hace guau`;
        }
        if (this.tipo === 'gato'|| this.tipo === 'Gato') {
            return `${this.nombre} hace miau`;
        }
    }
}
let Nash = new Animal1('Perro','Nash')
let Nico= new Animal2('Gato','Nico');
console.log(Nash.comer());
console.log(Nash.dormir());
console.log(Nash.hacerRuido());
console.log(Nico.comer());
console.log(Nico.dormir());
console.log(Nico.hacerRuido());