var dist = require('./distributions.js')
var PD = require("probability-distributions");


const qtd_amostas = 20;

var amostras = [];
var amostras_nao_repetidas = [];

for (var i = 0; i < qtd_amostas; i++){
    amostras[i] = Math.floor((Math.random() * 10) +1) ;
}
console.log("Amostras: "+ amostras);

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
console.log("Amostras não repetidas: "+ amostras_nao_repetidas);
//poisson();
/*Poisson */
function poisson () {
    for (var i = 0; i < amostras_nao_repetidas.length; i++){
        var num = amostras_nao_repetidas[i];            
        var qtd = quantas_vezes_aparece(num);
        lambda = qtd/qtd_amostas;    
        console.log('\nNúmero '+ num + ' apareceu '+ qtd +' vezes ');
        console.log('Lambda = '+ lambda +'\nPoisson('+ num +') = '+dist.poisson(qtd, lambda));    
    }
}

/*Triangular */
//triangular();
function triangular (){
    var mais_repete = numero_mais_repete();
    var maior = maior_encontrado();
    var menor = menor_encontrado(); 
    console.log("Maior: "+maior);
    console.log("Menor: "+menor);
    console.log("Mais repete: "+mais_repete);    
    for (var i = 0; i < amostras_nao_repetidas.length; i++){    
        var num = amostras_nao_repetidas[i];     
        var qtd = quantas_vezes_aparece(num);                     
        console.log('\nNúmero '+ num + ' apareceu '+ qtd +' vezes ');
        console.log('Triangular('+ num +') = '+dist.triangular(maior, menor, mais_repete, num));    
    }    
}

/*Uniforme */
uniforme();
function uniforme (){
    var maior = maior_encontrado();
    var menor = menor_encontrado(); 
    console.log("Maior: "+maior);
    console.log("Menor: "+menor);   
    for (var i = 0; i < amostras_nao_repetidas.length; i++){    
        var num = amostras_nao_repetidas[i];     
        var qtd = quantas_vezes_aparece(num);                     
        console.log('\nNúmero '+ num + ' apareceu '+ qtd +' vezes ');
        console.log('Uniforme('+ num +') = '+dist.uniforme(maior, menor, num));    
    }      
}

function quantas_vezes_aparece (num){
    var cont = 0;
    for(var i = 0; i< amostras.length; i++){
        if(amostras[i] == num){
            cont++;
        }
    }
    return cont;
}

function maior_encontrado (){
    return Math.max.apply(null, amostras_nao_repetidas)
}

function menor_encontrado (){
    return Math.min.apply(null, amostras_nao_repetidas)
}

function numero_mais_repete (){
    var cont_inicial = 0;
    var cont_atual = 0;
    var num = 0;
    for (var i = 0; i < amostras_nao_repetidas.length; i++){
        cont_atual = quantas_vezes_aparece(amostras_nao_repetidas[i]);
        if (cont_atual >= cont_inicial){
            num = amostras_nao_repetidas[i];
            cont_inicial = cont_atual;
        }        
    }       
    return num; 
}

