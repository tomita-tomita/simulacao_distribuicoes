var factorial = require( 'math-factorial' );


var pow = Math.pow;
var raiz = Math.sqrt;
const logNatural = 2.71;

module.exports = {

    /**
     *
     * @param qtd Quantidade de amostras desejadas
     * @param max Número máximo a ser sorteado     
     * @returns {array} Amostras sorteadas
     */
    gerarAmostras: function(qtd, max) {                            
        var amostras = [];

        for (var i = 0; i < qtd; i++){
            amostras[i] = Math.floor((Math.random() * max) +1) ;
        }

        return amostras
    },

    /**
     *
     * @param amostras Amostras a serem analisadas        
     * @returns {array} Amostras com números unicos
     */
    retirarRepetidos: function(amostras) {                            
        var amostras_sem_repeticao = amostras;        
        for (var i = 0; i < amostras_sem_repeticao.length; i++) {
            for(var j = i+1; j < amostras_sem_repeticao.length; j++){
                if(amostras_sem_repeticao[i] == amostras_sem_repeticao[j]){            
                    amostras_sem_repeticao.splice(j, 1);            
                    j--;
                }
            }							  
        }
        return amostras_sem_repeticao
    },    

    /**
     *
     * @param n Número sorteado.
     * @param lambda Lambda gerado     
     * @returns {number} Resultado poisson
     */
    poisson: function(n, lambda) {                            
        var toReturn = null;

        toReturn = (pow(logNatural, -lambda) * pow(lambda, n)) /  factorial(n);

        return toReturn
    },

    /**
     *
     * @param maior Maior número sorteado.
     * @param menor Menor número sorteado.
     * @param mais Número que mais se repete
     * @param n Número dentro das amostras     
     * @returns {number} Resultado triangular
     */
    triangular: function(maior, menor, mais, n) {                            
        var toReturn = null;
        if(n >= menor && n < mais){
            toReturn = (2*(n - menor)) / ((maior - menor) * (mais - menor));
        }else if(n == mais){
            toReturn = 2/(maior - menor);
        }else if(n > mais && n <= maior){
            toReturn = (2*(maior - n)) / ((maior - menor) * (maior - mais));
        }else{
            toReturn = 0;
        }        

        return toReturn
    },   

    /**
     *
     * @param maior Maior número sorteado.
     * @param menor Menor número sorteado.
     * @param n Número dentro das amostras     
     * @returns {number} Resultado triangular
     */
    uniforme: function(maior, menor, n) {                            
        var toReturn = null;

        if(n >= menor && n <= maior){
            toReturn = 1/(maior - menor);
        }else{
            toReturn = 0;
        }   

        return toReturn
    },

    /**
     *
     * @param amostras Conjunto de amostras              
     * @returns {number} Media
     */
    media: function(amostras) {                            
        var media = 0; 
        for(var i = 0; i< amostras.length; i++){
            media = media + amostras[i];
        }    
        return media/amostras.length;
    },

    /**
     *
     * @param amostras Conjunto de amostras      
     * @param media Media do conjunto de amostras        
     * @returns {number} Variancia
     */
    variancia: function(amostras, media) {                            
        var variancia = 0;        
        for(var i = 0; i< amostras.length; i++){
            var num = amostras[i];
            variancia = variancia + Math.pow((num - media), 2);
        }     
        return variancia/(amostras.length - 1);
    },           

    /**
     *
     * @param variancia Variancias                 
     * @returns {number} Desvio Padrão
     */
    desvioPadrao: function(variancia) {                                           
        return raiz(variancia);
    },                 

};
