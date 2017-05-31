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

};