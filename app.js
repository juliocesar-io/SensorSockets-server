/**
Socket receptor del streaming enviado desde una app en android,
* encargado de recibir los datos binarios (Buffers) y codificarlos
* para luego graficarlos en el navegador con Javascript.
*
* [TODO]
*    - Investigar formas de tratamiento de datos binarios.
*    - Indagar sobre la escalabilidad de Sokects.
*
* Julio César
* @juliocesar_io
* 2014
**/

var io      =  require('socket.io').listen(3131),
    colors  =  require("colors"),
    fs      =  require('fs'),
    ip      =  require('ip'),
    net     =  require('net');

var  out;


server = net.createServer(function (socket) {
    socket.setEncoding("utf-8");
    socket.on('data', function (d) {

      //var writable = fs.createWriteStream('file2.txt');
      //writable.write(d, 'utf-8');
      // Se recive como string desde el metodo Output Stream

    console.log("CLIENTE : ",d.red);
    // Luego se hace una conversión a entero para presentarlo al cliente
    out = parseFloat(d);
    console.log("SERVER  : ".green, out);
      //require('util').log(temp.bold.green);
    });



}).listen(8000);

console.log("#######################");
console.log("Esperando en el puerto:", server.address().port);
console.log("IP Local:", ip.address());



io.sockets.on('connection', function (socket) {

 var max = 100;

  // Genera una muestra cada segundo

    setInterval(function() {
        var x = (new Date()).getTime(), // tiempo actual
            y = out;
        socket.emit('sample', {
          x: x,
          y: y
        });
        console.info("emitted: [" + x + "," + y + "]");
    }, 1000);



});
