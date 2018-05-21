let objetoJson;

$('#button').on('click',function(e){

	let input=$('#inputNombre').val();
	
	if (input!=''){
		
		objetoJson={
			'nombre': input,
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
	}
});

