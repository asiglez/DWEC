function pintarTriangulo(n){
    let resultado=[];
    let t=parseInt(n)+parseInt(n) - 1;
    for(let f=0;f<n;f++){
        let fila=[];
        resultado[f]=fila;
        for(let c=0;c<t;c++){
            if(f===n-1 || c===t-n-f || c===t-(n-f)){
            fila[c]='*';
            }else{
                fila[c]=' ';
            }
        }
    }
    return resultado;
}
let resultado=pintarTriangulo(prompt('Introduce el tamaño'));
for(let index in resultado){
console.log(resultado[index]);
}