function pintarRombo(n){
    let resultado=[];
    let t=(parseInt(n)+parseInt(n)-1)/2;
    for(let f=0;f<n;f++){
        let fila=[];
        resultado[f]=fila;
        for(let c=0;c<t;c++){
            if(f===(n-1)/2 || c===t-n/2-f || c===t-(n/2-f)){
            fila[c]='*';
            }else{
                fila[c]=' ';
            }
        }
    }
    return resultado;
}
let resultado=pintarRombo(prompt('Introduce el tamaño'));
for(let index in resultado){
console.log(resultado[index]);
}