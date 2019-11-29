let express = require('express')
let app = express()
let path = require('path')

var http = require('http').Server(app);
var io = require('socket.io')(http);

var clients = {};

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', (path.join(__dirname, 'public')))
app.use('/js', express.static(__dirname + '/node_modules/'));
app.use('/assets', express.static(__dirname + '/public/assets'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use('/',(req, res) => {
  console.log('##### Servidor acessado #####')
  res.render('index.html')
})

io.on("connection", function (client) {
    client.on("join", function(name){
    	console.log("Joined: " + name);
        clients[client.id] = name;
        client.emit("update", "<b>Server send</b>: Public number choose by server: " + Math.round(Math.random() * 1000));
        //client.broadcast.emit("update", name + " has joined the server.")
    });

    client.on("send", function(msg){
    	console.log("Message: " + msg);
        //client.broadcast.emit("chat", clients[client.id], msg);
    });

    client.on("disconnect", function(){
    	console.log("Disconnect");
        io.emit("update", clients[client.id] + " has left the server.");
        delete clients[client.id];
    });
});


http.listen(3000, function(){
  console.log('listening on port 3000');
});
