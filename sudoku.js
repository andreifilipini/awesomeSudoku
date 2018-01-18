//recupera todas as células
var celulas = document.getElementsByTagName("input");

//array com valores iniciais para um sudoku válido
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

//método responsável por popular células de acordo com array de valores
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

//método responsável por gerar um sudoku random
function geraSudoku(){
    //reinicia sudokuGerado
    sudokuGerado = [];

    //randomiza linhas
    reordenaLinhas();

    //randomiza colunas
    reordenaColunas();

    //remove randomicamente alguns valores
    sudokuGerado = removeValoresRandom(sudokuGerado);

    //carrega células com os valores gerados
    carregaSudoku(sudokuGerado);

    //bloqueia as células populadas para não serem alteradas pelo jogador
    bloqueiaEntradas();
}

//método responsável por bloquear as células com valor preenchido
function bloqueiaEntradas(){
    for(i=0; i< celulas.length; i++){
        celulas[i].disabled = celulas[i].value !== "" ? "disabled" : "";
    };
}

//método responsável por remover randomicamente valores do sudokuGerado
function removeValoresRandom(){
    //para cada linha do sudoku
    sudokuGerado.map(function(linha){
        //randomiza se serão removidos 4 ou 5 valores
        var qtdRemover = Math.floor(Math.random()) == 1 ? 4 : 5;
        do{
            //gera um indice randomico entre 0 e a quantidade de celulas da linha
            var randomIndex = Math.floor(Math.random()*linha.length);

            //verifica se a celula da linha na posição do indice gerado possui valor vazio
            if(linha[randomIndex] == ""){
                //se possui valor vazio repete loop
                continue;
            }
            //atribui valor vazio para a celula da linha na posição do indice gerado
            linha[randomIndex] = "";

            //decremeta contador até que seu valor seja 0
            qtdRemover--;
        } while(qtdRemover != 0);
    });
    //retorna sudoku gerado
    return sudokuGerado;
}

//método responsável por reordenar as linhas do sudoku
function reordenaLinhas(){
    var grupoLinhas = [[0, 1, 2],[3, 4, 5],[6, 7, 8]];
    var novoIndice = 0;
    //copia sudoku gerado
    var copiaSudokuGerado = JSON.parse(JSON.stringify(sudokuDefault));

    //para cada grupo de linhas
    grupoLinhas.map(function(grupoLinha, indice){
        var indiceRecuperado = [];
        do{
            //gera indice randomico entre 0 e o tamanho máximo de grupoLinha
            var indice2 = Math.floor(Math.random()*grupoLinha.length);

            //se o indice ainda não foi utilizado
            if(indiceRecuperado[indice2] === undefined){
                //marca indice como utilizado
                indiceRecuperado[indice2] = true;

                //sudokuGerado recebe a copia do sudoku gerado no indice randomico gerado
                sudokuGerado[novoIndice] = copiaSudokuGerado[indice2 + (indice*3)];

                //incrementa novo indice
                novoIndice++;
            }
        }while(novoIndice%3 != 0)
    });
}

//método responsável por reordenar as colunas do sudoku
function reordenaColunas(){
    var grupoColunas = [[0, 1, 2],[3, 4, 5],[6, 7, 8]];
    var novoIndice = 0;
    //copia sudoku gerado
    var copiaSudokuGerado = JSON.parse(JSON.stringify(sudokuGerado));
    
    //para cada grupo de colunas
    grupoColunas.map(function(grupoColuna, indice){
        var indiceRecuperado = [];
        do{
            //gera indice randomico entre 0 e o tamanho máximo de grupoColuna
            var indice2 = Math.floor(Math.random()*grupoColuna.length);

            //se o indice ainda não foi utilizado
            if(indiceRecuperado[indice2] === undefined){
                //marca indice como utilizado
                indiceRecuperado[indice2] = true;

                //sudokuGerado recebe a copia do sudoku gerado no indice randomico gerado
                for(i = 0; i<9; i++){
                    sudokuGerado[i][novoIndice] = copiaSudokuGerado[i][indice2 + (indice*3)];
                }

                //incrementa novo indice
                novoIndice++;
            }
        }while(novoIndice%3 != 0)
    });
}

//variavel que armazena iterações realizadas para resolver o sudoku
var iteracoes = 0;

//método responsávle por resolver o sudoku
function resolveSudoku(grid, linha, coluna) {
    //incrementa interação
    iteracoes++;

    //procura próxima celula vazia
    var celula = procuraCelulaVazia(grid, linha, coluna);
    linha = celula[0];
    coluna = celula[1];

    if (linha == -1) {
        //resolvido
        return true;
    }

    //para cada valor de 1 a 9
    for (var i = 1; i <= 9; i++) {
        //verificar se o valor pode ser atribuido na linha e coluna da celula vazia
        if ( validaValor(grid, linha, coluna, i) ) {   
            grid[linha][coluna] = i;

            //chama recursivamente o método de resolver sudoku
            if ( resolveSudoku(grid, linha, coluna) ) {         
                return true;
            }

            //atribui o valor vazio para a linha/coluna informada pois foi encontrado valor errado
            grid[linha][coluna] = "";
        }
    }

    return false;
}

//inicia resolução do sudoku
function start(){
    //se o sudoku não foi gerado, ou seja, foi informado pelo jogador
    if(sudokuGerado.length === 0){
        //inicia valor das células com o informado pelo jogador
        celulas = document.getElementsByTagName("input");

        var indiceInterno = 0;
        //gera array com linhas e colunas com os valores informados pelo jogador
        for(indice = 0; indice < celulas.length; indice++){
            if(sudokuGerado[Math.floor(indice/9)] === undefined){
                sudokuGerado[Math.floor(indice/9)] = [];
            }
            sudokuGerado[Math.floor(indice/9)][indiceInterno] = celulas[indice].value;
            if(indiceInterno === 8){
                indiceInterno = 0;
            } else {
                indiceInterno++;
            }
        }
        //bloqueia entradas
        bloqueiaEntradas();
    }

    //reseta quantidade de iterações
    iteracoes = 0;

    //resolve sudoku
    resolveSudoku(sudokuGerado, 0, 0);

    //carrega sudoku
    carregaSudoku(sudokuGerado);
    
    //exibe no console número de iterações
    console.log("iterações: " + iteracoes);
}

//limpa entradas
function reset(){
    for(indice = 0; indice < celulas.length; indice++){
        celulas[indice].value = "";
    }
    sudokuGerado = [];
    bloqueiaEntradas();
}

//método responsável por procurar a próxima celula vazia partindo da posição informada
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

//método responsável por validar se um valor pode ser atribuido para a linha e a coluna informada
function validaValor(grid, linha, coluna, valor) {
    return validaLinha(grid, linha, valor)
        && validaColuna(grid, coluna, valor)
        && validaGrupo(grid, linha, coluna, valor);
}

//método responsável por validar se o valor pode ser atribuido para a linha informada
function validaLinha(grid, linha, valor) {
    //para cada coluna
    for (var coluna = 0; coluna < 9; coluna++){
        //se o valor da linha[coluna] for igual ao valor informado, o valor não pode ser atribuido
        if (grid[linha][coluna] == valor){
            return false;
        }
    }

    return true;
}

//método responsável por validar se o valor pode ser atribuido para a coluna informada
function validaColuna(grid, coluna, valor) {
    //para cada linha
    for (var linha = 0; linha < 9; linha++){
        //se o valor da linha[coluna] for igual ao valor informado, o valor não pode ser atribuido
        if (grid[linha][coluna] == valor){
            return false;
        }
    }

    return true;    
}

//método responsável por validar se o valor pode ser atribuido para o grupo obtido através da linha/coluna informadas
function validaGrupo(grid, linha, coluna, valor) {
    //recupera grupo através da linah e coluna informadas
    linha = Math.floor(linha / 3) * 3;
    coluna = Math.floor(coluna / 3) * 3;

    //para cada linha do grupo
    for (var l = 0; l < 3; l++){
        //para cada coluna do grupo
        for (var c = 0; c < 3; c++){
            //se o valor da linha[coluna] for igual ao valor informado, o valor não pode ser atribuido
            if (grid[linha + l][coluna + c] == valor){
                return false;
            }
        }
    }

    return true;
}