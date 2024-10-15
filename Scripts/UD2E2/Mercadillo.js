'use strict';
let mercadillo=(function(){
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
function ordenarProductosPorPrecio(){
    let ordenado= new Array();
    ordenado=mercadillo.sort((a,b)=> a.precio - b.precio);
    return ordenado;
}
function imprimirInventario(){
    let inventario=[];
    for(let nombre in mercadillo){
        let producto = mercadillo[nombre];
        let total = producto.Cantidad * producto.Precio;
        inventario.push({ nombre, ...producto, Total: total });
    }
    return inventario;
}
function filtrarProductosPorCategoria(categoria){
    let productosFiltrados = [];
    for (let nombre in mercadillo) {
        let producto = mercadillo[nombre];
        if (producto.Categoria === categoria) {
            productosFiltrados.push({
                nombre: nombre,
                cantidad: producto.Cantidad,
                precio: producto.Precio
            });
        }
    }

    return productosFiltrados;
}
})();