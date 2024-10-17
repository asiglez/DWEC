'use strict';
let mercadillo = (function () {
    let productos = {};
    function comprobarProducto(array, nombre) {
        return nombre in array;
    }

    function agregarProducto(nombre, cantidad, precio, categoria) {
        if (comprobarProducto(productos, nombre)) {
            alert("El producto ya existe");
        } else {
            productos[nombre] = {
                Cantidad: cantidad,
                Precio: precio,
                Categoria: categoria
            };
        }
    }

    function eliminarProducto(nombre) {
        if (comprobarProducto(productos, nombre)) {
            delete productos[nombre];
        } else {
            alert("El producto no existe");
        }
    }

    function buscarProducto(nombre) {
        if (comprobarProducto(productos, nombre)) {
            return productos[nombre];
        } else {
            alert("El producto no existe");
        }
    }

    function actualizarInventario(nombre, cantidad) {
        if (comprobarProducto(productos, nombre)) {
            if (productos[nombre].Cantidad + cantidad < 0) {
                alert("No hay suficiente stock");
            } else {
                productos[nombre].Cantidad += cantidad;
                if (productos[nombre].Cantidad === 0) {
                    alert("Hace falta reposición");
                }
            }
        } else {
            alert("El producto no existe");
        }
    }

    function ordenarProductosPorPrecio() {
        let ordenado = Object.keys(productos).map((nombre) => ({
            nombre,
            ...productos[nombre]
        }));
        return ordenado.sort((a, b) => a.Precio - b.Precio);
    }

    function imprimirInventario() {
        let inventario = [];
        for (let nombre in productos) {
            let producto = productos[nombre];
            let total = producto.Cantidad * producto.Precio;
            inventario.push({ nombre, ...producto, Total: total });
        }
        return inventario;
    }

    function filtrarProductosPorCategoria(categoria) {
        let productosFiltrados = [];
        for (let nombre in productos) {
            let producto = productos[nombre];
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

    return {
        agregarProducto,
        eliminarProducto,
        buscarProducto,
        actualizarInventario,
        ordenarProductosPorPrecio,
        imprimirInventario,
        filtrarProductosPorCategoria
    };
})();
window.addEventListener("load",function(){
document.getElementById('formAgregarProducto').addEventListener('submit', function (e) {
    e.preventDefault();
    let nombre = document.getElementById('nombre').value;
    let cantidad = parseInt(document.getElementById('cantidad').value);
    let precio = parseFloat(document.getElementById('precio').value);
    let categoria = document.getElementById('categoria').value;
    mercadillo.agregarProducto(nombre, cantidad, precio, categoria);
});

document.getElementById('btnBuscarProducto').addEventListener('click', function () {
    let nombre = document.getElementById('buscarNombre').value;
    let producto = mercadillo.buscarProducto(nombre);
    document.getElementById('resultadoBusqueda').textContent = producto ? JSON.stringify(producto) : 'Producto no encontrado';
});

document.getElementById('btnEliminarProducto').addEventListener('click', function () {
    let nombre = document.getElementById('eliminarNombre').value;
    mercadillo.eliminarProducto(nombre);
});

document.getElementById('btnActualizarInventario').addEventListener('click', function () {
    let nombre = document.getElementById('actualizarNombre').value;
    let cantidad = parseInt(document.getElementById('actualizarCantidad').value);
    mercadillo.actualizarInventario(nombre, cantidad);
});

document.getElementById('btnOrdenarPorPrecio').addEventListener('click', function () {
    let productos = mercadillo.ordenarProductosPorPrecio();
    document.getElementById('productosOrdenados').textContent = JSON.stringify(productos, null, 2);
});

document.getElementById('btnFiltrarPorCategoria').addEventListener('click', function () {
    let categoria = document.getElementById('filtrarCategoria').value;
    let productos = mercadillo.filtrarProductosPorCategoria(categoria);
    document.getElementById('productosFiltrados').textContent = JSON.stringify(productos, null, 2);
});

document.getElementById('btnImprimirInventario').addEventListener('click', function () {
    let inventario = mercadillo.imprimirInventario();
    document.getElementById('inventario').textContent = JSON.stringify(inventario, null, 2);
});
});