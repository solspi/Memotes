var contenidoLocalStorageJugadas=JSON.parse(localStorage.getItem('jugadas')).jugadas;

/*
*Funcion para ordenar un arreglo de manera ascendente
*
*/
function sortAsc(a, b){
	var aIntentos = a.intentosUsados;
	var bIntentos = b.intentosUsados;
  	return ((aIntentos < bIntentos) ? -1 : ((aIntentos > bIntentos) ? 1 : 0));
}

contenidoLocalStorageJugadas.sort(sortAsc);

//Se genera una fila de tres celdas por cada jugada guardada a mostrar en la tabla
$.each( contenidoLocalStorageJugadas, function( i, e ){
    $('#listado').append(`<tr><td>${e.nombre}</td><td>${e.complejidad}</td><td>${e.intentosUsados}</td></tr>}`);
});