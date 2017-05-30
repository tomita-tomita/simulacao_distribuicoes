var array = [];
var teste = [];

for (var i = 0; i < 20; i++){
    array[i] = Math.floor((Math.random() * 10) +1) ;
}
console.log(array);

for(var i = 0; i < array.length; i++){		
    teste[i] = array[i];				
}

for (var i = 0; i < teste.length; i++) {
    for(var j = i+1; j < teste.length; j++){
        if(teste[i] == teste[j]){            
            teste.splice(j, 1);            
            j--;
        }
    }							  
}
console.log(teste);
for (var i = 0; i < teste.length; i++){
    console.log (teste[i]+' apareceu: '+quantas_vezes_aparece(teste[i]));
}

function quantas_vezes_aparece (num){
    var cont = 0;
    for(var i =0; i< array.length; i++){
        if(array[i] == num){
            cont++;
        }
    }
    return cont;
}

