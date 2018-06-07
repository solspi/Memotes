var objetoJson;

$('#sectionLoco').on('touchstart click',function(e){
	window.location.href = 'ranking.html';//Redirección a la pantalla del Ranking 
});


$('#button').on('touchstart click',function(e){

	let inputNombre=$('#inputNombre').val();
	let inputNivel=$('#select').val();
	
	if (inputNombre!='' && inputNivel!=""){
		
		objetoJson={
			'nombre': inputNombre,
			'nivel': inputNivel
		}

		localStorage.setItem('padawan', JSON.stringify(objetoJson));
		//localstorage.clear();

		swal({
				title:'Instrucciones',
				text:'Haz click en una ficha.\n Busca su compañera.\n Forma todos los pares que puedas en la menor cantidad de pasos.\n\n Que la Fuerza te acompañe!',
				closeOnClickOutside:false,
				buttons:{
						cancel:{
						 text: 'cancelar',value: false,visible: true,className: "",closeModal: true,
						},
						confirm:{
						 text: 'comenzar',value: true,visible: true,className: "",closeModal: true,
						}
				}
			}).then(function(respuesta) {
					if(respuesta){
						window.location.href = 'juego.html';
					}
					else{
						window.location.reload();
					}
				});
	
		$('#inputNombre').val('');
		$('#speed').val('');
		$('#mjeObligatorio').text('')
	}
	else{
		$('#mjeObligatorio').html('*Ingresar tu nombre y seleccionar el nivel debes');
	}
});

