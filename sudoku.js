var celulas = document.getElementsByTagName("input");
var sudokuDefault = [
        ["1", "2", "3", "7", "8", "9", "4", "5", "6"],
        ["4", "5", "6", "1", "2", "3", "7", "8", "9"],
        ["7", "8", "9", "4", "5", "6", "1", "2", "3"],
        ["2", "3", "4", "8", "9", "1", "5", "6", "7"],
        ["5", "6", "7", "2", "3", "4", "8", "9", "1"],
        ["8", "9", "1", "5", "6", "7", "2", "3", "4"],
        ["3", "4", "5", "9", "1", "2", "6", "7", "8"],
        ["6", "7", "8", "3", "4", "5", "9", "1", "2"],
        ["9", "1", "2", "6", "7", "8", "3", "4", "5"]
];
var sudokuGerado = [];

function carregaSudoku(sudoku){
    var indiceInterno = 0;
    for(indice = 0; indice < celulas.length; indice++){
        celulas[indice].value = sudoku[Math.floor(indice/9)][indiceInterno];
        if(indiceInterno === 8){
            indiceInterno = 0;
        } else {
            indiceInterno++;
        }
    }
}

function geraSudoku(){
    sudokuGerado = [];
    reordenaLinhas();
    reordenaColunas();
    sudokuGerado = removeValoresRandom(sudokuGerado);
    carregaSudoku(sudokuGerado);
    bloqueiaEntradas();
}

function bloqueiaEntradas(){
    //para cada objeto no array de celulas executa funÃ§Ã£o
    for(i=0; i< celulas.length; i++){
        celulas[i].disabled = celulas[i].value !== "" ? "disabled" : "";
    };
}

function removeValoresRandom(){
    sudokuGerado.map(function(linha){
        var qtdRemover = Math.floor(Math.random()) == 1 ? 4 : 5;
        do{
            var randomIndex = Math.floor(Math.random()*sudokuGerado.length);
            if(linha[randomIndex] == ""){
                continue;
            }
            linha[randomIndex] = "";
            qtdRemover--;
        } while(qtdRemover != 0);
    });
    return sudokuGerado;
}

function reordenaLinhas(){
    var grupoLinhas = [[0, 1, 2],[3, 4, 5],[6, 7, 8]];
    var novoIndice = 0;
    var copiaSudokuGerado = JSON.parse(JSON.stringify(sudokuDefault));
    grupoLinhas.map(function(grupoLinha, indice){
        var indiceRecuperado = [];
        do{
            var indice2 = Math.floor(Math.random()*grupoLinha.length);
            if(indiceRecuperado[indice2] === undefined){
                indiceRecuperado[indice2] = true;
                sudokuGerado[novoIndice] = copiaSudokuGerado[indice2 + (indice*3)];
                novoIndice++;
            }
        }while(novoIndice%3 != 0)
    });
}

function reordenaColunas(){
    var grupoColunas = [[0, 1, 2],[3, 4, 5],[6, 7, 8]];
    var novoIndice = 0;
    var copiaSudokuGerado = JSON.parse(JSON.stringify(sudokuGerado));
    
    grupoColunas.map(function(grupoColuna, indice){
        var indiceRecuperado = [];
        do{
            var indice2 = Math.floor(Math.random()*grupoColuna.length);
            if(indiceRecuperado[indice2] === undefined){
                indiceRecuperado[indice2] = true;
                for(i = 0; i<9; i++){
                    sudokuGerado[i][novoIndice] = copiaSudokuGerado[i][indice2 + (indice*3)];
                }
                novoIndice++;
            }
        }while(novoIndice%3 != 0)
    });
}

var iteracoes = 0;
function resolveSudoku(grid, linha, coluna) {
    iteracoes++;
    var celula = procuraCelulaVazia(grid, linha, coluna);
    linha = celula[0];
    coluna = celula[1];

    if (linha == -1) {
        //resolvido!
        return true;
    }

    for (var i = 1; i <= 9; i++) {
        if ( validaValor(grid, linha, coluna, i) ) {   
            grid[linha][coluna] = i;

            if ( resolveSudoku(grid, linha, coluna) ) {                
                return true;
            }

            grid[linha][coluna] = "";
        }
    }

    return false;
}

function start(){
    iteracoes = 0;
    resolveSudoku(sudokuGerado, 0, 0);
    carregaSudoku(sudokuGerado);
    console.log("iterações: " + iteracoes);
}

function procuraCelulaVazia(grid, linha, coluna) {
    while (true) {
        if (grid[linha][coluna] === "") {
            //encontrou celula vazia
            return[linha, coluna];
        } else if (coluna < 8) {
            //incrementa coluna enquanto não for a ultima;
            coluna++;
        } else {
            //se for a ultima coluna incrementa a linha e reseta a coluna
            linha++;
            coluna = 0;
            if(linha === 9){
                // resolveu todas celulas
                return [-1, -1];
            }
        }
    }
}

function validaValor(grid, linha, coluna, valor) {
    return validaLinha(grid, linha, valor)
        && validaColuna(grid, coluna, valor)
        && validaGrupo(grid, linha, coluna, valor);
}

function validaLinha(grid, linha, valor) {
    for (var coluna = 0; coluna < 9; coluna++){
        if (grid[linha][coluna] == valor){
            return false;
        }
    }

    return true;
}
function validaColuna(grid, coluna, valor) {
    for (var linha = 0; linha < 9; linha++){
        if (grid[linha][coluna] == valor){
            return false;
        }
    }

    return true;    
}
function validaGrupo(grid, linha, coluna, valor) {
    linha = Math.floor(linha / 3) * 3;
    coluna = Math.floor(coluna / 3) * 3;

    for (var l = 0; l < 3; l++){
        for (var c = 0; c < 3; c++){
            if (grid[linha + l][coluna + c] == valor){
                return false;
            }
        }
    }

    return true;
}