var dist = require('./distributions.js')
const chalk = require('chalk');
var PD = require("probability-distributions");

const QTD_AMOSTRAS = 20;
const MAX = 10
var amostras = dist.gerarAmostras(QTD_AMOSTRAS, MAX);
console.log(chalk.green("Amostras: ")+ amostras);
var amostras_nao_repetidas = dist.retirarRepetidos(amostras);
console.log(chalk.yellow("Amostras não repetidas: ")+ amostras_nao_repetidas);

//poisson();
/*Poisson */
//X => seja o número de ocorrências de um evento em um intervalo
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

/*Normal */
//Media
//Desvio Padrão
//Achar o Z
//normal();
function normal (){
    console.log(dist.media(amostras));
    console.log(dist.variancia(amostras, dist.media(amostras)));  
    console.log(dist.desvioPadrao(dist.variancia(amostras, dist.media(amostras))));      
}


// function calcula_variancia (){    
//     var variancia = 0;
//     var media = calcula_media();
//     for(var i = 0; i< amostras.length; i++){
//         var num = amostras[i];
//         variancia = variancia + Math.pow((num - media), 2);
//     }     
//     return variancia/(amostras.length - 1);
// }

// function calcula_media (){   
//     var media = 0; 
//     for(var i = 0; i< amostras.length; i++){
//         media = media + amostras[i];
//     }    
//     return media/amostras.length;
// }

// function calcula_desvio_padrao (variancia){
//     return Math.sqrt(variancia);
// }

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

