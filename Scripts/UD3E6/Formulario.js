import { alumnos } from "./datos.js";

let seleccionados = [];

const cicloFiltro = document.getElementById("cicloFiltro");
const tablaIzquierda = document.getElementById("tablaIzquierda");
const tablaDerecha = document.getElementById("tablaDerecha");
const botonMoverDerecha = document.getElementById("moverDerecha");
const botonMoverIzquierda = document.getElementById("moverIzquierda");
const botonEnviar = document.getElementById("enviar");
const resultado = document.getElementById("resultado");

function renderTablaIzquierda(tabla, datos) {
    tabla.innerHTML = datos.map(alumno => `
    <tr data-id="${alumno.alumnoId}">
      <td>${alumno.nombre}</td>
      <td>${alumno.ciclo}</td>
    </tr>
  `).join("");
}

function renderTablaDerecha(tabla, datos) {
    tabla.innerHTML = datos.map((alumno, index) => `
      <tr data-id="${alumno.alumnoId}" data-index="${index}">
        <td>${alumno.nombre}</td>
        <td>${alumno.ciclo}</td>
        <td>
          <button class="subir">Subir</button>
          <button class="bajar">Bajar</button>
        </td>
      </tr>
    `).join("");
  }
function actualizarIzquierda() {
    const filtro = cicloFiltro.value;
    const filtrados = alumnos.filter(a =>
        (filtro === "Todos" || a.ciclo === filtro) &&
        !seleccionados.some(s => s.alumnoId === a.alumnoId)
    );
    renderTablaIzquierda(tablaIzquierda, filtrados);
}

function manejarSeleccion(event) {
    const fila = event.target.closest("tr");
    if (fila) fila.classList.toggle("seleccionado");
}

function moverDerecha() {
    const filasSeleccionadas = [...tablaIzquierda.querySelectorAll("tr.seleccionado")];
    filasSeleccionadas.forEach(fila => {
        const id = parseInt(fila.dataset.id, 10);
        const alumno = alumnos.find(a => a.alumnoId === id);
        seleccionados.push(alumno);
        fila.remove();
    });
    renderTablaDerecha(tablaDerecha, seleccionados);
}

function moverIzquierda() {
    const filasSeleccionadas = [...tablaDerecha.querySelectorAll("tr.seleccionado")];
    filasSeleccionadas.forEach(fila => {
        const id = parseInt(fila.dataset.id, 10);
        seleccionados = seleccionados.filter(a => a.alumnoId !== id);
        fila.remove();
    });
    actualizarIzquierda();
}

function enviar() {
    const datos = seleccionados.map((alumno, index) => ({
        alumnoId: alumno.alumnoId,
        nombre: alumno.nombre,
        orden: index + 1
    }));
    resultado.textContent = JSON.stringify(datos, null, 2);
}

function subir() {
    const index = parseInt(fila.dataset.index, 10);
    if (index > 0) {
        [seleccionados[index - 1], seleccionados[index]] = [seleccionados[index], seleccionados[index - 1]];
        renderTablaDerecha(tablaDerecha, seleccionados);
    }
}

function bajar() {
    const index = parseInt(fila.dataset.index, 10);
    if (index < seleccionados.length - 1) {
        [seleccionados[index + 1], seleccionados[index]] = [seleccionados[index], seleccionados[index + 1]];
        renderTablaDerecha(tablaDerecha, seleccionados);
    }
}

cicloFiltro.addEventListener("change", actualizarIzquierda);
tablaIzquierda.addEventListener("click", manejarSeleccion);
tablaDerecha.addEventListener("click", manejarSeleccion);
botonMoverDerecha.addEventListener("click", moverDerecha);
botonMoverIzquierda.addEventListener("click", moverIzquierda);
botonEnviar.addEventListener("click", enviar);

tablaDerecha.addEventListener("click", (event) => {
    if (event.target.classList.contains("subir")) {
        const index = parseInt(event.target.dataset.index, 10);
        subir(index);
    } else if (event.target.classList.contains("bajar")) {
        const index = parseInt(event.target.dataset.index, 10);
        bajar(index);
    }
});

actualizarIzquierda();