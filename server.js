//framework com os recursos para app web
let express = require('express')
//api primos
let isPrime = require('prime-number')
//constroi api express
let app = express()
var bigInt = require("big-integer");
let path = require('path')

//cria um servidor utilizando o protocolo http
var http = require('http').Server(app);
//cria io para comunicação http através de socket
var io = require('socket.io')(http);

var clients = {};

//configurações para pastas e arquivos do node.
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', (path.join(__dirname, 'public')))
app.use('/js', express.static(__dirname + '/node_modules/'));
app.use('/assets', express.static(__dirname + '/public/assets'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

//recebe a rota para página inicial
app.use('/',(req, res) => {
  console.log('##### Servidor acessado #####')
  res.render('index.html')
})

//método principal do socket que aguarda comandos
io.on("connection", function (client) {
    var ger_k //chave geradora
    var private_k //chave privada
    var prime_number = Math.ceil(Math.random() * (50000 - 500) + 500)
    console.log(prime_number)
    console.log(isPrime(prime_number))
    //função é acionada quando o cliente acessa a página e submete seu nick no campo de texto
    client.on("join", function(name){
    	console.log("Joined: " + name);
        clients[client.id] = name;
        //enquanto o número sorteado não for primo, procure outro > 500
        while (!isPrime(prime_number)){
          prime_number = Math.ceil(Math.random() * (50000 - 500) + 500)
          console.log("Numero: " + prime_number)
        }
        //envia para o cliente um comando "update" para exibir a mensagem com o número primo
        client.emit("update", "<b>Server send</b>: Prime number choose by server: " + prime_number);
        //passa o número primo para o cliente
        client.emit("generate", prime_number);
        //client.broadcast.emit("update", name + " has joined the server.")
    });

    //recebe alguma mensagem do cliente e insere no console
    client.on("send", function(msg){
    	console.log("Message: " + msg);
        //client.broadcast.emit("chat", clients[client.id], msg);
    });

    //dispara comandos quando disconecta
    client.on("disconnect", function(){
    	console.log("Disconnect");
        io.emit("update", clients[client.id] + " has left the server.");
        delete clients[client.id];
    });

    /*é responsável por gerar a chave pública para o Cliente
    * recebe um gerador 'ger' que é utilizado no calculo
    * chave pública gerada X = ( gerador ^ chave_privada mod primo)
    */
    client.on("generate", function(ger) {
      //número aleatório para 2 > chave privada <= 100
      private_k = Math.ceil(Math.random() * (1000 - 2) + 2)
      ger_k = parseInt(ger, 10)
      console.log("Privada do servidor " + private_k);
      var x = bigInt(ger_k).pow(private_k)
      x = bigInt(x).mod(prime_number)
      client.emit("update", "Chave pública X gerada pelo servidor: " + x)
      //compartilha o número público com o cliente
      client.emit("shared", x)
    	console.log("Chave pública X gerada pelo servidor: " + x);
    });

    //recebe o número público Y gerado pelo cliente e gera a chave compartilhada
    client.on("shared", function(public_y){
      var shared_k = bigInt(public_y).pow(private_k)
      shared_k = bigInt(shared_k).mod(prime_number)
      console.log("shared server: " + shared_k);
    });

});

//servidor fica aguardando requisições na porta 3000
http.listen(3000, function(){
  console.log('listening on port 3000');
});
