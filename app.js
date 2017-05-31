var dist = require('./distributions.js')
var PD = require("probability-distributions");


const qtd_amostas = 20;

var amostras = [];
var amostras_nao_repetidas = [];

for (var i = 0; i < qtd_amostas; i++){
    amostras[i] = Math.floor((Math.random() * 10) +1) ;
}
console.log("Amostras: "+amostras);

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

//console.log("Números sorteados(repetidos): "+amostras_nao_repetidas);
for (var i = 0; i < amostras_nao_repetidas.length; i++){
    //console.log (amostras_nao_repetidas[i]+' apareceu: '+quantas_vezes_aparece(amostras_nao_repetidas[i])+" vezes");        
    var qtd = quantas_vezes_aparece(amostras_nao_repetidas[i]);
    lambda = qtd/qtd_amostas;
    console.log(amostras_nao_repetidas[i] + ' => '+qtd+' ---> '+lambda+' => '+dist.poisson(qtd, lambda));
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

