const dist = require('./distributions.js')
const chalk = require('chalk');
const readline = require('readline');
var json2csv = require('json2csv');
var stream = require('stream');
var fs = require('fs');

var exibe = console.log;
var amostras = [];
var amostrasSemRepeticao = [];
var lambda = 0;
var mais_repete = 0;
var maior = 0;
var menor = 0;
var maior = 0;
var menor = 0;
var media = 0;
var variancia = 0;
var desvioPadrao = 0;
var chiPoisson = 0;
var chiTriangular = 0;
var chiUniforme = 0;
var chiNormal = 0;
var arrayChi = [];
var novasAmostras = [];

var instream = fs.createReadStream('amostras_iniciais.txt');
var outstream = new stream;
var rl = readline.createInterface(instream, outstream);
rl.on('line', function(line) {
    amostras.push(Number(line));   
});
rl.on('close', function() {
    //amostras = dist.gerarAmostras(QTD_AMOSTRAS, MAX);
    var QTD_AMOSTRAS = amostras.length;
    var MAX = QTD_AMOSTRAS / 2;
    const ESPERADO = 1/QTD_AMOSTRAS;

    exibe(chalk.blue("Amostras: ")+ amostras);

    /*Remover números repetidos */
    for (var i = 0; i < amostras.length; i++){
        amostrasSemRepeticao[i] = amostras[i];
    }
    for (var i = 0; i < amostrasSemRepeticao.length; i++) {
        for(var j = i+1; j < amostrasSemRepeticao.length; j++){
            if(amostrasSemRepeticao[i] == amostrasSemRepeticao[j]){            
                amostrasSemRepeticao.splice(j, 1);            
                j--;
            }
        }							  
    }

    exibe(chalk.yellow("Amostras sem repetição: ")+ amostrasSemRepeticao);

    for (var i = 0; i < amostrasSemRepeticao.length; i++){
        var num = amostrasSemRepeticao[i];            
        var qtd = quantas_vezes_aparece(num);                
        exibe(chalk.yellow.bold(num) + ' apareceu '+ chalk.red.bold(qtd +(qtd > 1 ? ' vezes' : ' vez')));                 
    }

    /*Poisson */
    poisson();
    function poisson () {    
        lambda = dist.media(amostras);   
        var resultsPoisson = [];
        exibe(chalk.blue.bold("\nDistribuição Poisson"));
        exibe("lambda: "+lambda);
        for (var i = 0; i < amostrasSemRepeticao.length; i++){
            var num = amostrasSemRepeticao[i];            
            var qtd = quantas_vezes_aparece(num);                         
            resultsPoisson[i] = dist.poisson(qtd, lambda);           
        }
        chiPoisson = dist.chiQuadrado(resultsPoisson, ESPERADO);
        arrayChi[0] = {nome: 'Poisson', chi: chiPoisson};
        exibe(chalk.bgCyan(chalk.black.bold("Chi-Qradado Poisson: "+chiPoisson)));
    }

    /*Triangular */
    triangular();
    function triangular (){
        mais_repete = numero_mais_repete();
        maior = maior_encontrado();
        menor = menor_encontrado();     
        resultsTriangular = [];
        exibe(chalk.blue.bold("\nDistribuição Triangular"));
        exibe("Maior: "+maior);
        exibe("Menor: "+menor);
        exibe("Mais repete: "+mais_repete);    
        for (var i = 0; i < amostrasSemRepeticao.length; i++){    
            var num = amostrasSemRepeticao[i];     
            var qtd = quantas_vezes_aparece(num);                             
            resultsTriangular[i] = dist.triangular(maior, menor, mais_repete, num);        
        }    
        chiTriangular = dist.chiQuadrado(resultsTriangular, ESPERADO)
        arrayChi[1] = {nome: 'Triangular', chi: chiTriangular};
        exibe(chalk.bgCyan(chalk.black.bold("Chi-Qradado Triangular: "+chiTriangular)));
    }

    /*Uniforme */
    uniforme();
    function uniforme (){
        maior = maior_encontrado();
        menor = menor_encontrado();     
        var resultsUniforme = [];
        exibe(chalk.blue.bold("\nDistribuição Uniforme"));
        exibe("Maior: "+maior);
        exibe("Menor: "+menor);   
        for (var i = 0; i < amostrasSemRepeticao.length; i++){    
            var num = amostrasSemRepeticao[i];     
            var qtd = quantas_vezes_aparece(num);                             
            resultsUniforme[i] = dist.uniforme(maior, menor, num);
        }      
        chiUniforme = dist.chiQuadrado(resultsUniforme, ESPERADO);
        arrayChi[2] = {nome: 'Uniforme', chi: chiUniforme};
        exibe(chalk.bgCyan(chalk.black.bold("Chi-Qradado Uniforme: "+chiUniforme)));
    }

    /*Normal */
    normal();
    function normal (){
        media = dist.media(amostras);
        variancia = dist.variancia(amostras, dist.media(amostras));
        desvioPadrao = dist.desvioPadrao(variancia);    
        var resultsNormal = [];
        exibe(chalk.blue.bold("\nDistribuição Normal"));
        exibe("Media: "+media);
        exibe("Variancia: "+variancia);
        exibe("Desvio Padrão: "+desvioPadrao);
        for (var i = 0; i < amostrasSemRepeticao.length; i++){
            var num = amostrasSemRepeticao[i];     
            var qtd = quantas_vezes_aparece(num);       
            resultsNormal[i] = dist.normal(num, media, desvioPadrao);            
        }  
        chiNormal = dist.chiQuadrado(resultsNormal, ESPERADO);
        arrayChi[3] = {nome: 'Normal', chi: chiNormal};
        exibe(chalk.bgCyan(chalk.black.bold("Chi-Qradado Normal: "+chiNormal)));      
    }

    arrayChi.sort(function (a, b) {
        if (a.chi > b.chi) {
            return 1;
        }
        if (a.chi < b.chi) {
            return -1;
        }    
        return 0;
    });

    menor_chi_quadrado();
    function menor_chi_quadrado (){  
        exibe(chalk.blue.bold("\n\Menor Chi_Quadrado encontrado"));
        for (var key in arrayChi) {    
            if(key == 0){
                var distribuicao = arrayChi[key].nome;                             
                exibe(chalk.bgMagenta(chalk.white.bold("Chi-Qradado "+arrayChi[key].nome+": "+arrayChi[key].chi)));
                if(arrayChi[key].nome == 'Poisson'){
                    novasAmostras = dist.rpoison(QTD_AMOSTRAS, lambda);
                }else if(arrayChi[key].nome == 'Uniforme'){
                    novasAmostras = dist.runiforme(QTD_AMOSTRAS,menor, maior);
                }else if(arrayChi[key].nome == 'Normal'){
                    novasAmostras = dist.rnormal(QTD_AMOSTRAS, media, desvioPadrao);
                }else{
                    novasAmostras = dist.rtriangular(QTD_AMOSTRAS, menor, maior, mais_repete);
                }
                exibe("\nNovas amostras geradas com a distribuição "+chalk.bgMagenta(arrayChi[key].nome));
                var fields = ['numero'];  
                var numbers = [];          
                for(var i = 0; i < novasAmostras.length; i++){                 
                    numbers.push({
                        numero: novasAmostras[i]
                    })                      
                }                                   
                var csv = json2csv({ data: numbers, fields: fields });
                fs.writeFile('nova_amostra_'+distribuicao+'.csv', csv, function(err) {
                    if (err) throw err;
                    exibe(chalk.yellow.bold("Novas amostras exportadas. \nnova_amostra_"+distribuicao+".csv"));
                });            
            }        
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
        return Math.max.apply(null, amostrasSemRepeticao)
    }

    function menor_encontrado (){
        return Math.min.apply(null, amostrasSemRepeticao)
    }

    function numero_mais_repete (){
        var cont_inicial = 0;
        var cont_atual = 0;
        var num = 0;
        for (var i = 0; i < amostrasSemRepeticao.length; i++){
            cont_atual = quantas_vezes_aparece(amostrasSemRepeticao[i]);
            if (cont_atual >= cont_inicial){
                num = amostrasSemRepeticao[i];
                cont_inicial = cont_atual;
            }        
        }       
        return num; 
    }        
    
    return amostras;
});

    




