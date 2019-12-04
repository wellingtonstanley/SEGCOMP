$(document).ready(function(){
    var socket = io.connect("http://localhost:3000");
    var ready = false;
    var qnt_msg = 0;

    //recebe a submição inicial e exibe informações iniciais na tela do client-server
    $("#submit").submit(function(e) {
        e.preventDefault();
        $("#nick").fadeOut();
        $("#chat").removeAttr('hidden');
        var name = $("#nickname").val();
        var time = new Date();
        $("#name").html('Sr.(a) <b>'+name+'</b>');
        $("#time").html('Connected since: ' + time.getHours() + ':' + time.getMinutes());

        ready = true;
        qnt_msg++;
        //chama o método join do servidor
        socket.emit("join", name);
    });

    //exibe mensagens que o servidor deseja informar.
    socket.on("update", function(msg) {
        if (ready) {
            $('.chat').append('<li class="info">' + msg + '</li>')
            qnt_msg++;
        }
    });

    //apenas emite os campos para preencher os textos do diálogo client-server
    $("#textarea").keypress(function(e){
        if(e.which == 13) {
             var text = $("#textarea").val();
             $("#textarea").val('');
             var time = new Date();
             $(".chat").append('<li class=""><div class="msg"><span><strong>Cliente '
                          + $("#nickname").val() + ' enviou às </span><i>'
                          + '<time>' + time.getHours() + ':' + time.getMinutes() + '</strong></time><br>'
                          + text + '</i></div></li>');
             if(qnt_msg > 1){
              $("#public_key").addClass('d-none');
              $("#message").removeClass('d-none');
             }
             socket.emit("send", text);
        }
    });

    /* é responsável por exibir o campo que é acionado para receber a chave
    * geradora informada pelo cliente e fornecer para o servidor. Em seguida
    * calcuca a chave pública Y e emite para o servidor.
    * chave pública gerada Y = ( gerador ^ chave_privada mod primo)
    */
    $("#number_input").keypress(function(e){
        if(e.which == 13) {
             var text = $("#number_input").val();
             $("#number_input").val('');
             var time = new Date();
             $(".chat").append('<li class=""><div class="msg"><span><strong>Cliente '
                          + $("#nickname").val() + ' enviou às </span><i>'
                          + '<time>' + time.getHours() + ':' + time.getMinutes() + '</strong></time><br>'
                          + text + '</i></div></li>');
              $("#public_key").addClass('d-none');
              $("#message").removeClass('d-none');

              //número aleatório para 2 > chave privada <= 100
              private_k = Math.ceil(Math.random() * (1000 - 2) + 2)
              var ger = parseInt(text, 10)
              //emite para o server o número gerador informado pelo cliente
              socket.emit("generate", ger)
              //gera a chave pública
              var y = bigInt(ger).pow(private_k)
              y = bigInt(y).mod(prime)
              socket.emit("send", "Privada do cliente " + private_k)
              //manda uma mensagem para exibir informação de chave Y gerada
              socket.emit("send", "Chave pública Y gerada pelo cliente: " + y);
              //compartilha a chave gerada para o servidor calcular a chave compartilhada
              socket.emit("shared", y)
        }
    });

    //recebe o número primo do servidor
    socket.on("generate", function(prime_number) {
      prime=prime_number;
    });

    //recebe o número público Y gerado pelo cliente e gera a chave compartilhada = shared secret
    socket.on("shared", function(public_x) {
      var shared_k = bigInt(public_x).pow(private_k)
      shared_k = bigInt(shared_k).mod(prime)
      socket.emit("send", "Chave shared cliente: " + shared_k)
    });

});
