'use strict';
let mercadillo=[];
function comprobarProducto(array,nombre){
    let comprobacion=false;
for(let valor in array){
    if(valor===nombre){
    comprobacion=true;
    break;
    }
}
return comprobacion;
}
function agregarProducto(nombre,cantidad,precio,categoria){
    let producto=new Array();
    producto["Cantidad"]=cantidad;
    producto["Precio"] = precio,
    producto["Categoria"] = categoria;
    if(comprobarProducto(mercadillo,nombre)){
        alert("El producto ya existe");
    }else{
        mercadillo[nombre]=producto;
    }
}
function eliminarProducto(nombre){
    if(comprobarProducto(mercadillo,nombre)){
       delete mercadillo[nombre];
    }else{
        alert("El producto no existe");
    }
}
function buscarProducto(nombre){
    if(comprobarProducto(mercadillo,nombre)){
        return mercadillo[nombre];
    }else{
        alert("El producto no existe");
    }
}
function actualizarInventario(nombre,cantidad){
    if(comprobarProducto(mercadillo,nombre)){
        if((mercadillo[nombre]["Cantidad"]-cantidad)<<0){
            alert("No hay suficiente stock");
        }else{
            mercadillo[nombre]["Cantidad"]+=cantidad;
            if(mercadillo[nombre]["Cantidad"]===0){
                alert("Hace falta reposicion");
            }
        }
    }else{
        alert("El producto no existe");
    }
}

agregarProducto("Platano",10,1.50,1);
agregarProducto("Manzana",5,1.50,1);
console.log(mercadillo);
eliminarProducto("Platano");
console.log(mercadillo);
console.log(buscarProducto("Manzana"));
actualizarInventario("Manzana",-6);
console.log(mercadillo);