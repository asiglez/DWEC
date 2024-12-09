(function() {
  function obtenerEstructuraJSON() {
    function procesarNodo(nodo) {
      const etiqueta = nodo.tagName.toLowerCase();
      const texto = Array.from(nodo.childNodes)
        .filter(child => child.nodeType === Node.TEXT_NODE)
        .map(child => child.textContent.trim())
        .join(" ")
        .trim();
      const tieneId = nodo.hasAttribute("id");
      const lstClass = Array.from(nodo.classList);
      const lstData = {};

      Array.from(nodo.attributes).forEach(attr => {
        if (attr.name.startsWith("data-")) {
          lstData[attr.name] = attr.value;
        }
      });

      const lstHijos = Array.from(nodo.children).map(hijo => procesarNodo(hijo));

      return {
        etiqueta: etiqueta,
        texto: texto,
        tieneId: tieneId,
        lstClass: lstClass.length ? lstClass : [],
        lstData: Object.keys(lstData).length ? lstData : {},
        lstHijos: lstHijos
      };
    }
    return procesarNodo(document.body);
  }

  function imprimirEstructura(selector) {
      const nodo = document.querySelector(selector);
      if (!nodo) {
        console.error(`No se encontró ningún nodo con el selector: ${selector}`);
        return '';
      }
  
      let cadena = '';
      let nodoActual = nodo;
  
      while (nodoActual) {
        const etiqueta = nodoActual.tagName.toLowerCase();
        const id = nodoActual.id || 'noid'; // Mostrar 'noid' si no tiene id
        const clases = nodoActual.classList.length > 0 ? Array.from(nodoActual.classList).join(',') : 'noclass'; // Mostrar 'noclass' si no tiene clases
        const texto = nodoActual.textContent.trim().replace(/\s+/g, ' ').slice(0, 20); // Limitar a 20 caracteres para la vista previa
  
        // Construir la cadena para mostrar en la página
        cadena = `${etiqueta}-${id}-${clases}-${texto}\n` + cadena;
        
        nodoActual = nodoActual.parentElement; // Subir un nivel en el árbol DOM
      }
  
      return cadena; // Devolver la cadena generada
    }

  window.analizadorDOM = {
    obtenerEstructuraJSON,
    imprimirEstructura
  };
window.addEventListener("DOMContentLoaded", function() {
  const estructuraJSON = obtenerEstructuraJSON();
  document.body.insertAdjacentHTML(
    'beforeend',
    `<h2>Estructura JSON del DOM</h2><pre>${JSON.stringify(estructuraJSON, null, 2)}</pre>`
  );
  const estructuraTexto = imprimirEstructura('footer');
  document.body.insertAdjacentHTML(
    'beforeend',
    `<h2>Estructura desde el nodo "footer"</h2><pre>${estructuraTexto}</pre>`
  );
});
})();