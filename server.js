var express = require('express');
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io')(server);

var contador = 0;
var contador2 = 0;
var contador3 = 0;
var config = require('./public/demo.json');


app.use(express.static(__dirname + '/public'));
io.on("connection", function(client) {
	client.on("conectando", function (usuario) {

		
		numeroDocumento = usuario.doc;
		votoRealizado = 0;

		// validacion que el usario a votado
		for (var data in config) {
		   dataUser = config[data];
		   if(dataUser.dni == numeroDocumento){
		   		if(config[data].voto == true){
		   			votoRealizado = 1;
		   		}
		   }
		}

		//el usuario voto
		if(votoRealizado == 0){
			usuario.status = "voto-registrado";
			contador += usuario.numero;
	    	contador2 += usuario.numero2;
	    	contador3 += usuario.numero3;
		}else{
			usuario.status = "ya-se-realizo-voto";
		}
		
    	// el usuario registrado que ya voto
    	for (var data in config) {
		   dataUser = config[data];
		   if(dataUser.dni == numeroDocumento){
		   		config[data].voto = true;
		   }
		}


		client.emit("conectado", 
			{ contador1: contador, contador2: contador2 , contador3:contador3,status:usuario.status});
		client.broadcast.emit("conectado", 
			{ contador1: contador, contador2: contador2 , contador3:contador3,status:usuario.status});
	});

	client.on("init", function (usuario) {
		client.emit("conectado", 
			{ contador1: contador, contador2: contador2 , contador3:contador3,status:usuario.status});
		client.broadcast.emit("conectado", 
			{ contador1: contador, contador2: contador2 , contador3:contador3,status:usuario.status});
	});
});

server.listen(process.env.PORT || 8080, function() {
	console.log("El servidor ha iniciado en el puerto 8080");
});