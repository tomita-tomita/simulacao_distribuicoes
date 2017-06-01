var factorial = require( 'math-factorial' );


var pow = Math.pow;
const logNatural = 2.71;

module.exports = {
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
               

};
