function listaContains(lista, obj) {
    if(lista === undefined || obj === undefined){
        return false;
    }
    for (var i = 0; i < lista.length; i++) {
        if (lista[i] === obj) {
            return true;
        }
    }
    return false;
}