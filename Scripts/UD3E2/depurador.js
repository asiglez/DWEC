import { NodoInspector } from './nodoinspector.js';

export const $depurador = (function () {
    let inspector = null;
    let panel = null;

    function crearEstiloResaltado() {
        const style = document.createElement("style");
        style.textContent = `
            .resaltado {
                outline: 2px solid rgba(255, 0, 0, 0.5);
                background-color: rgba(255, 0, 0, 0.2);
            }
        `;
        document.head.appendChild(style);
    }

    function crearPanel() {
        panel = document.createElement("div");
        panel.style.position = "fixed";
        panel.style.bottom = "10px";
        panel.style.right = "10px";
        panel.style.backgroundColor = "#f4f4f4";
        panel.style.padding = "10px";
        panel.style.border = "1px solid #ccc";
        panel.style.zIndex = 10000;

        // Botones de navegación
        const botones = [
            { etiqueta: "Raíz", accion: () => actualizarNodo(document.documentElement) },
            { etiqueta: "Padre", accion: () => inspector.irPadre() },
            { etiqueta: "Primer hijo", accion: () => inspector.irPrimerHijo() },
            { etiqueta: "Último hijo", accion: () => inspector.irUltimoHijo() },
            { etiqueta: "Hermano anterior", accion: () => inspector.irAnteriorHermano() },
            { etiqueta: "Hermano siguiente", accion: () => inspector.irSiguienteHermano() },
        ];

        botones.forEach(({ etiqueta, accion }) => {
            const boton = document.createElement("button");
            boton.textContent = etiqueta;
            boton.style.margin = "2px";
            boton.onclick = () => {
                accion();
                actualizarPanel();
            };
            panel.appendChild(boton);
        });

        // Área de texto para información del nodo
        const info = document.createElement("textarea");
        info.id = "infoNodo";
        info.readOnly = true;
        info.style.width = "100%";
        info.style.height = "100px";
        info.style.marginTop = "5px";
        panel.appendChild(info);

        document.body.appendChild(panel);
    }

    function actualizarNodo(nodo) {
        if (inspector) {
            inspector = new NodoInspector(nodo);
        } else {
            inspector = new NodoInspector(document.documentElement);
        }
    }

    function actualizarPanel() {
        const info = panel.querySelector("#infoNodo");
        const datos = inspector.obtenerInfo();
        info.value = `Etiqueta: ${datos.etiqueta}\nID: ${datos.id}\nClases: ${datos.clases}\nTexto: ${datos.texto}`;
    }

    return {
        activarDepuracion() {
            crearEstiloResaltado();
            crearPanel();
            actualizarNodo(document.documentElement);
        },
        desactivarDepuracion() {
            if (panel) {
                panel.remove();
                panel = null;
            }
            const estilo = document.querySelector("style");
            if (estilo) {
                estilo.remove();
            }
            inspector = null;
        }
    };
})();

document.addEventListener("DOMContentLoaded", () => {
    $depurador.activarDepuracion();
});