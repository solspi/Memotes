var contenidoLocalStorage=JSON.parse(localStorage.getItem('padawan'));
var arregloPrincipal=[1,2,3,4,5,6,1,2,3,4,5,6];
var anterior; var aciertos=0; var intentos=24; var contClick=0;

$('#nombre').html(contenidoLocalStorage.nombre);

/*
*Función para mezclar los elementos de un arreglo.
*@params {array} arreglo
*@return {array}
*/
function shuffle(arreglo) {
    
    var j, x, i;
    for (var i = arreglo.length-1; i >=0; i--) {
        j = Math.floor(Math.random() * arreglo.length);
        x = arreglo[i];
        arreglo[i] = arreglo[j];
        arreglo[j] = x;
    }

    return arreglo;
}

/*
*Función para apendar cada img en cada figure del DOM.
*@params {array} arreglo
*/
function cargarImagenes(arreglo){
	
	for (i=0; i<arreglo.length; i++){	
		$("#fig"+i).append(`<img id="${i}" data-name="${arreglo[i]}" src="img/${arreglo[i]}.png"></img>`)
		$("#fig"+i).append(`<img src="img/imgStarWars.png"></img>`)	
	}

	$('.linea figure img:first-child').addClass('back');
	$('.linea figure img:last-child').addClass('front');
}

/*
*Función que compara dos elementos para informar si tienen el mismo atributo "data-name" y no son identicos.
*@params {img} elemento1 
*@params {img} elemento2
*@return {string} 
*/
function match(elemento1,elemento2){
	
	if ((elemento1.data('name')==elemento2.data('name'))&&!(elemento1.attr('id')==elemento2.attr('id'))){
		return '0';		
	}
	else{	
		if (elemento1.data('name')!=elemento2.data('name')) {
			return '1';
		}
		else{
			return '2';	
		}
	}
}

/*
*Función que recibe como parámetro un texto que se muestra y el nombre de dos botones para crear un alert.
*@params {string} mensaje
*@params {string} boton1 
*@params {string} boton2
*/
function mostrarSweetAlert(mensaje,boton1,boton2){
	swal({
			text: mensaje,
			closeOnClickOutside:false,
			buttons:{
					cancel: {
					   text: boton1,value: false,visible: true,className: "",closeModal: true,
					},
					confirm: {
					   text: boton2,value: true,visible: true,className: "",closeModal: true,
					}
			}
		}).then(function(respuesta){	
				if(respuesta){
					window.location.reload();
				}
				else{
					window.location.href = 'index.html';
				}	
			});
}

/*
*Función que chequea si se alcanza el tope de intentos. Tambien si se consigue encontrar todos los pares de imgs.
*
*/
function controlar(){
	
	if (aciertos==6) {
		mostrarSweetAlert('Lo has logrado, mi Padawan! Continuar entrenando?','Más tarde','Si');
 	}
	if (intentos==0 && aciertos!=6) {
		mostrarSweetAlert('No lo has logrado, mi Padawan!! Esforzarte e intentar nuevamente debes.','Más tarde','Oki!');
	}

}

/*
*Función para girar una carta.
*@params {img} carta
*/
function girarCarta(carta){
	carta.toggleClass('front back');
	carta.next().toggleClass('front back');
}

/*
*Función para girar un par de cartas.
*@params {img} carta1
*@params {img} carta2
*/
function girarParCartas(carta1,carta2){
	girarCarta(carta1);
	girarCarta(carta2);	
}

/*
*Función que permite chequear en un arreglo si algún elemento tiene aplicada la clase front.
*@params {array} arreglo
*@return {boolean}
*/
function checkNotAnyFront(arreglo){

	let bandera=true;
	$.each(arreglo , function(i,e){
		if (e.getAttribute('class')=='front'){
			bandera=false;
		}
	})
	return bandera;
}


cargarImagenes(shuffle(arregloPrincipal));

$('.front').on('click' , function(e){
	if (checkNotAnyFront($('figure img:first-child').not(anterior))) {	
		girarCarta($(this).prev());//lo hago con .prev() para poder utilizar la función girarCarta
	
		if (anterior==null){
			anterior=$(this).prev();
		}
		else{	
			let resultadoMatch=match(anterior, $(this).prev());
			if (resultadoMatch=='0'){	
				anterior.removeClass('front');
				$(this).prev().removeClass('front');

				aciertos++;	
			}
			else{	
				if (resultadoMatch=='1') {	
					intentos--;

					$('#intentos').html(' '+intentos);
				}	
				setTimeout(girarParCartas, 1200, anterior, $(this).prev());
			}
			anterior=null;
		} 
   		setTimeout(controlar,2000); 
   	}   	
});





