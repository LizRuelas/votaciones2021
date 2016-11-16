var socket = io();

$(document).ready(function(){
	$("#candidato1").click(function(evt){
		evt.preventDefault();
			var data = {
			numero: 1,
			numero2: 0,
			numero3:0,
			status: "Connecting..."
			};
		console.log(data)
		socket.emit("conectando", data);
	});
	$("#candidato2").click(function(evt){
		evt.preventDefault();
			var data = {
			numero: 0,
			numero2: 1,
			numero3:0,
			status: "Connecting..."
			};
		console.log(data)
		socket.emit("conectando", data);
	});
	$("#candidato3").click(function(evt){
		evt.preventDefault();
			var data = {
			numero: 0,
			numero2: 0,
			numero3:1,
			status: "Connecting..."
			};
		console.log(data)
		socket.emit("conectando", data);
	});

	
});

socket.on("conectado", function (respuesta) {
	console.log(respuesta);
	$("#numContador1").text(respuesta.contador1);
	$("#numContador2").text(respuesta.contador2);
	$("#numContador3").text(respuesta.contador3);
});
