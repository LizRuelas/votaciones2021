var express = require('express');
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io')(server);

var contador = 0;
app.use(express.static(__dirname + '/public'));

io.on("connection", function(client) {
	client.on("conectando", function (usuario) {
		usuario.status = "Conected";
		console.log(usuario);
		contador += usuario.numero;
		client.emit("conectado", contador);
        client.broadcast.emit("conectado", contador);

	});
});

server.listen(8080, function() {
	console.log("El servidor ha iniciado en el puerto 8080");
});