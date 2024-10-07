'use strict';
function factorial(n){ 
    let cadena='';
    let factorial=1;
for(let i=n;i>0;i--){
factorial*=i;
if(n==1){
cadena+='1*1';
}else{
    if(i!=1){
        cadena+=i+'*';
        }else{
            cadena+=i;
        }
}
}
cadena+='='+factorial;
return cadena;
}
let resultado=factorial(prompt('Introduce un numero'));
console.log(resultado);