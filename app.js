var amostras = [];
var amostras_nao_repetidas = [];

for (var i = 0; i < 20; i++){
    amostras[i] = Math.floor((Math.random() * 10) +1) ;
}
console.log(amostras);

for(var i = 0; i < amostras.length; i++){		
    amostras_nao_repetidas[i] = amostras[i];				
}

for (var i = 0; i < amostras_nao_repetidas.length; i++) {
    for(var j = i+1; j < amostras_nao_repetidas.length; j++){
        if(amostras_nao_repetidas[i] == amostras_nao_repetidas[j]){            
            amostras_nao_repetidas.splice(j, 1);            
            j--;
        }
    }							  
}
console.log(amostras_nao_repetidas);
for (var i = 0; i < amostras_nao_repetidas.length; i++){
    console.log (amostras_nao_repetidas[i]+' apareceu: '+quantas_vezes_aparece(amostras_nao_repetidas[i]));
}

function quantas_vezes_aparece (num){
    var cont = 0;
    for(var i =0; i< amostras.length; i++){
        if(amostras[i] == num){
            cont++;
        }
    }
    return cont;
}

