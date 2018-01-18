var celulas = document.getElementsByTagName("div");

var moveu = false;
function moveDireita(){
    var linha = document.getElementsByClassName("linha1");
    if(!todosVazios(linha)){

    }
    linha = document.getElementsByClassName("linha2");
    if(!todosVazios(linha)){

    }
    linha = document.getElementsByClassName("linha3");
    if(!todosVazios(linha)){

    }
    linha = document.getElementsByClassName("linha4");
    if(!todosVazios(linha)){

    }
    if(moveu){
        verificaFimDeJogo();
    }
}

function moveEsquerda(){

    if(moveu){
        verificaFimDeJogo();
    }
}

function moveBaixo(){
    
    if(moveu){
        verificaFimDeJogo();
    }
}

function moveCima(){

    if(moveu){
        verificaFimDeJogo();
    }
}

function verificaFimDeJogo(){

}

function todosVazios(){

}