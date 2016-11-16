var express = require('express');
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io')(server);

var contador = 0;
var contador2 = 0;
var contador3 = 0;

app.use(express.static(__dirname + '/public'));
io.on("connection", function(client) {
	client.on("conectando", function (usuario) {
		usuario.status = "Conected";
		contador += usuario.numero;
    	contador2 += usuario.numero2;
    	contador3 += usuario.numero3;
	client.emit("conectado", 
		{ contador1: contador, contador2: contador2 , contador3:contador3});
	client.broadcast.emit("conectado", 
		{ contador1: contador, contador2: contador2 , contador3:contador3});
	});
});

server.listen(8080, function() {
	console.log("El servidor ha iniciado en el puerto 8080");
});