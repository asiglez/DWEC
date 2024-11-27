(function () {
  function obtenerEstructuraJSON() {
    const body = document.body;
    const texto = function () {
      let texto = '';
      for (let nodo of body.childNodes) {
        if (nodo.nodeType === Node.TEXT_NODE) {
          texto += nodo.textContent.replace(/\s+/g, ' ').trim();
        }
      }
      return texto;
    }
    const lstData = function(){
      const array=Array.from(body.attributes);
      const as ={};
      for(let a=0;a<array.length;a++){
        if(array[a].name.startsWith("data-*")){
          
        }
      }
      return as;
  }
  const json = {
    etiqueta: body.tagName.toLowerCase(),
    texto: texto(),
    tieneId: body.id === "" ? false : true,
    lstClass: Array.from(body.classList),
    lstData: lstData,
    lstHijos: Array.from(body.children)
  }
  return json;
}
  window.analizadorDOM = {
  obtenerEstructuraJSON,
};
}) ();
document.addEventListener("DOMContentLoaded", function () {
  console.log(analizadorDOM.obtenerEstructuraJSON());
});