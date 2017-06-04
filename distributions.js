var factorial = require( 'math-factorial' );
var crypto = require('crypto');

var pow = Math.pow;
var raiz = Math.sqrt;
var exp = Math.exp;
var PI = Math.PI;
var ln = Math.log;
var sqrt = Math.sqrt;
const logNatural = 2.71;

module.exports = {

    /**
     *
     * @param len Número de bytes
     * @returns {number} A pseduo random number between 0 and 1
     *
     */
    prng: function(len) {
        if(len === undefined) len = 16;

        var entropy = crypto.randomBytes(len);
        var result = 0;

        for(var i=0; i<len; i++) {
            result = result + Number(entropy[i])/pow(256,(i+1))
        }
        return result
    },    

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
     * @param num Número aleatório
     * @param media Media das amostras
     * @param dsp Desvio padrão das amostras
     * @returns {Number}
     */
    normal: function(num, media, dsp) {                
        var a = dsp*(sqrt(2*PI));
        var b = -(num-media)*(num-media);
        var c = 2*dsp*dsp;

        return (1/a)*exp(b/c)
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

    /**
     *
     * @param obtidos Valores obtidos pelas distribuições                 
     * @param esperado Valore esperado pelas amostras
     * @returns {number} Chi-Quadrado
     */
    chiQuadrado: function(obtidos, esperado) {                                           
        var chi = 0;        
        for (var i = 0; i < obtidos.length; i++){
            chi = chi + Math.pow((obtidos[i] - esperado), 2) / esperado;
        }
        return chi;        
    },     

    /**
     *
     * @param n Número de amostras a serem geradas
     * @param lambda Lambda a ser usado
     * @returns {Array} Array com amostras geradas
     */
    rpoison: function(n, lambda) {
        var toReturn = [];
        for(var i = 0; i < n; i++) {
            var L = exp(-lambda);
            var p = 1;
            var k = 0;
            do {
                k++;
                p *= this.prng();
            } while (p > L);
            toReturn.push(k - 1);
        }

        return toReturn
    },    

    /**
     *
     * @param n 
     * @param meida Meida a ser usada
     * @param sd Desvio padrão
     * @returns {Array} Amostras geradas
     */
    rnormal: function(n, mean, sd) {      
        var toReturn = [];

        for(var i = 0; i < n; i++) {
            var V1, V2, S, X;

            do {
                var U1 = this.prng();
                var U2 = this.prng();
                V1 = (2 * U1) - 1;
                V2 = (2 * U2) - 1;
                S = (V1 * V1) + (V2 * V2);
            } while (S > 1);

            X = Math.sqrt(-2 * ln(S) / S) * V1;
            X = mean + sd * X;
            toReturn.push(X);
        }

        return toReturn
    },    

    /**
     *
     * @param n  Número de amostras a serem geradas
     * @param min Número mínimo
     * @param max Número máximo
     * @returns {Array} Array amostras geradas
     */
    runiforme: function(n, min, max) {
        var toReturn = [];

        for(var i = 0; i < n; i++) {
            var num = this.prng();
            var gerado = min + num*(max-min);
            toReturn.push(gerado)
        }
        return toReturn
    },   
    
    /**
     *
     * @param n  Número de amostras a serem geradas
     * @param min Número mínimo
     * @param max Número máximo
     * @param mais Número que mais repete
     * @returns {Array} Array amostras geradas
     */
    rtriangular: function(n, min, max, mais) {
        var toReturn = [];
        for(var i = 0; i < n; i++) {
            var num = this.prng();     
            var num2 = this.prng();                        
            var gerado = max + (min + (num * (mais - min) - max) * sqrt(num2));
            toReturn.push(gerado);
        }
        return toReturn
    },        

};
